/**
 * Smoke Test — Envío real de correos (usa las credenciales del .env)
 *
 * USO:
 *   node tests/smoke/send-real.js
 *
 * Qué hace:
 *   Envía 3 correos reales a amatu85@gmail.com:
 *     1. RRPP case 1 (Trámite presentado) desde cuenta MAIN
 *     2. RRPP case 2 (Trámite inscrito con devolución) desde cuenta MAIN
 *     3. Recibo de pago desde cuenta SECOND
 *
 * Este archivo NO es un test de Jest. Es un script manual de validación
 * antes de un deploy. NO va a producción automatizado.
 */
require('dotenv').config();

const { sendEmail } = require('../../src/services/email.service');

const DEST = 'amatu85@gmail.com';

const tests = [
  {
    label: '1️⃣  RRPP Case 1 — Trámite presentado [cuenta MAIN]',
    params: {
      to:         DEST,
      type:       'rrpp',
      caseId:     '1',
      useAccount: 'main',
      data: {
        kardex:           'K-SMOKE-001',
        numeroTitulo:     '2025-SMOKE-999',
        oficinaRegistral: 'Lima',
      }
    }
  },
  {
    label: '2️⃣  RRPP Case 2 — Trámite inscrito con devolución [cuenta MAIN]',
    params: {
      to:         DEST,
      type:       'rrpp',
      caseId:     '2',
      useAccount: 'main',
      data: {
        kardex:          'K-SMOKE-002',
        numeroTitulo:    '2025-SMOKE-888',
        montoDevolucion: '75.00',
        telefono:        '987654321',
      }
    }
  },
  {
    label: '3️⃣  Recibo de pago — boleta [cuenta SECOND]',
    params: {
      to:         DEST,
      type:       'recibo',
      useAccount: 'second',
      data: {
        cliente: 'Alexander Cruz (Smoke Test)',
      }
    }
  },
];

async function runSmoke() {
  console.log('\n🚀 Iniciando smoke test de envío real de correos...');
  console.log(`📬 Destinatario: ${DEST}\n`);

  let passed = 0;
  let failed = 0;

  for (const { label, params } of tests) {
    process.stdout.write(`${label} ... `);
    try {
      const result = await sendEmail(params);
      console.log(`✅  OK | messageId: ${result.info.messageId} | logSaved: ${result.logSaved}`);
      passed++;
    } catch (err) {
      console.log(`❌  FALLÓ: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n─────────────────────────────────────`);
  console.log(`Resultado: ${passed} enviados, ${failed} fallidos de ${tests.length} pruebas`);
  if (failed > 0) process.exit(1);
}

runSmoke().catch((err) => {
  console.error('Error inesperado en smoke test:', err);
  process.exit(1);
});
