const ExcelJS = require('exceljs');

const MAX_BULK_RECIPIENTS = 500;
const EMAIL_HEADER_ALIASES = new Set(['email', 'correo', 'correoelectronico', 'emaildestinatario', 'correodestinatario']);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeHeader(value) {
  return String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]/g, '');
}

async function readRecipientsExcel(buffer) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);
  const firstSheet = workbook.worksheets[0];
  if (!firstSheet) throw new Error('El Excel no contiene hojas con datos');
  if (firstSheet.rowCount > 5000 || firstSheet.columnCount > 256) {
    throw new Error('El Excel excede el máximo permitido de 5000 filas o 256 columnas');
  }

  const rows = [];
  firstSheet.eachRow({ includeEmpty: false }, (row) => {
    rows[row.number - 1] = row.values.slice(1).map((value) => {
      if (value && typeof value === 'object' && 'text' in value) return value.text;
      if (value && typeof value === 'object' && 'result' in value) return value.result;
      return value ?? '';
    });
  });
  if (rows.length < 2) throw new Error('El Excel debe incluir encabezado y al menos un correo');

  const emailColumn = rows[0].findIndex((heading) => EMAIL_HEADER_ALIASES.has(normalizeHeader(heading)));
  if (emailColumn < 0) throw new Error('No se encontró una columna "correo" o "email" en la primera fila');

  const recipients = [];
  const invalidRows = [];
  for (let i = 1; i < rows.length; i++) {
    if (!rows[i]) continue;
    const email = String(rows[i][emailColumn] ?? '').trim();
    if (!email) continue;
    if (!EMAIL_PATTERN.test(email)) invalidRows.push(i + 1);
    else recipients.push({ email, row: i + 1 });
    if (recipients.length > MAX_BULK_RECIPIENTS) {
      throw new Error(`El máximo es ${MAX_BULK_RECIPIENTS} destinatarios por solicitud`);
    }
  }

  if (invalidRows.length) {
    throw new Error(`Hay correos inválidos en las filas: ${invalidRows.slice(0, 20).join(', ')}${invalidRows.length > 20 ? ', ...' : ''}`);
  }
  if (!recipients.length) throw new Error('No se encontraron correos para enviar');
  return recipients;
}

module.exports = { readRecipientsExcel, MAX_BULK_RECIPIENTS };
