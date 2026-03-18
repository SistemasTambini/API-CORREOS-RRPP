/**
 * Tests unitarios — AttachmentBuilder
 */
const { build, collectFiles } = require('../../src/builders/attachment.builder');
const path = require('path');

// Mock de fs.promises para no tocar disco real
jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn().mockResolvedValue(Buffer.from('pdf-content')),
  },
}));

const makePdf = (fieldname, originalname = 'test.pdf') => ({
  fieldname,
  originalname,
  buffer:   Buffer.from('test'),
  mimetype: 'application/pdf',
});

describe('collectFiles', () => {
  test('ordena numerados antes que sin índice', () => {
    const files = [
      makePdf('pdfs[]',   'sin-indice.pdf'),
      makePdf('pdfs[1]',  'segundo.pdf'),
      makePdf('pdfs[0]',  'primero.pdf'),
    ];
    const result = collectFiles(files);
    expect(result[0].originalname).toBe('primero.pdf');
    expect(result[1].originalname).toBe('segundo.pdf');
    expect(result[2].originalname).toBe('sin-indice.pdf');
  });

  test('acepta fieldname "pdf"', () => {
    const result = collectFiles([makePdf('pdf')]);
    expect(result).toHaveLength(1);
  });

  test('acepta fieldname "pdfs"', () => {
    const result = collectFiles([makePdf('pdfs')]);
    expect(result).toHaveLength(1);
  });

  test('retorna array vacío si no hay archivos', () => {
    expect(collectFiles([])).toHaveLength(0);
    expect(collectFiles(undefined)).toHaveLength(0);
  });
});

describe('build — adjuntos', () => {
  test('mapea archivos a formato Nodemailer', async () => {
    const pdfs = [makePdf('pdfs[0]', 'doc.pdf')];
    const attachments = await build({ pdfs, caseId: '1', data: {} });
    expect(attachments).toHaveLength(1);
    expect(attachments[0].filename).toBe('doc.pdf');
    expect(attachments[0].contentType).toBe('application/pdf');
  });

  test('sanitiza nombre de archivo con caracteres inválidos', async () => {
    const pdfs = [makePdf('pdfs[0]', 'archivo:con*caracteres?.pdf')];
    const attachments = await build({ pdfs, caseId: '1', data: {} });
    expect(attachments[0].filename).not.toMatch(/[\\/:*?"<>|]/);
  });

  test('genera nombre fallback cuando originalname está vacío', async () => {
    const pdfs = [{ ...makePdf('pdfs[0]'), originalname: '' }];
    const attachments = await build({ pdfs, caseId: '1', data: {} });
    expect(attachments[0].filename).toMatch(/adjunto-01\.pdf/);
  });

  test('caseId=2 con montoDevolucion >= 10 → agrega devolucion.pdf', async () => {
    const attachments = await build({ pdfs: [], caseId: '2', data: { montoDevolucion: '50.00' } });
    const nombres = attachments.map(a => a.filename);
    expect(nombres).toContain('devolucion.pdf');
  });

  test('caseId=2 con montoDevolucion < 10 → NO agrega devolucion.pdf', async () => {
    const attachments = await build({ pdfs: [], caseId: '2', data: { montoDevolucion: '5.00' } });
    const nombres = attachments.map(a => a.filename);
    expect(nombres).not.toContain('devolucion.pdf');
  });

  test('caseId=1 → NO agrega devolucion.pdf nunca', async () => {
    const attachments = await build({ pdfs: [], caseId: '1', data: { montoDevolucion: '999' } });
    const nombres = attachments.map(a => a.filename);
    expect(nombres).not.toContain('devolucion.pdf');
  });
});
