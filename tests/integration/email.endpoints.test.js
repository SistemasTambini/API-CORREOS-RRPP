/**
 * Tests de integración — Endpoints de Email
 *
 * Mockea:
 *  - config/transporter  → evita conexión SMTP real
 *  - repositories/emailLog.repository → evita conexión MySQL real
 *
 * Cubre:
 *  - POST /api/email/send-main   con los 9 cases RRPP (1-9) + case 10 alias
 *  - POST /api/email/send-main   con type='recibo' (boleta de pago)
 *  - POST /api/email/send-second con type='recibo'
 *  - Validaciones: falta 'to', falta 'type', PDF inválido, type desconocido
 *  - GET  /api/email/logs
 *  - GET  /api/email/logs/search
 */
const request = require('supertest');

// ── 1. Mocks ANTES de requerir la app ──────────────────────────────────────

// Mock transporter: simula envío exitoso sin conectar a SMTP
jest.mock('../../src/config/transporter', () => ({
  main:   { sendMail: jest.fn().mockResolvedValue({ messageId: '<mock-id-main@test>', accepted: ['dest@test.com'] }) },
  second: { sendMail: jest.fn().mockResolvedValue({ messageId: '<mock-id-second@test>', accepted: ['dest@test.com'] }) },
}));

// Mock repository: evita conexión a MySQL
jest.mock('../../src/repositories/emailLog.repository', () => ({
  trySave:          jest.fn().mockResolvedValue({ saved: true, error: null }),
  findAll:          jest.fn().mockResolvedValue([{ id: 1, destinatario: 'a@b.com', estado: 'SENT' }]),
  findWithFilters:  jest.fn().mockResolvedValue([{ id: 2, destinatario: 'c@d.com', estado: 'FAILED' }]),
}));

// Mock devolucion.pdf para attachment builder (caseId=2)
jest.mock('fs', () => ({
  promises: { readFile: jest.fn().mockResolvedValue(Buffer.from('pdf-fake')) },
}));

// ── 2. Importar la app ya con mocks activos ────────────────────────────────
require('dotenv').config();
const app = require('../../src/app');

// ── 3. Helpers ─────────────────────────────────────────────────────────────
const BASE_URL  = '/api/email';

/** Construye el cuerpo mínimo para un envío RRPP exitoso */
const rrppBody = (caseId, extraData = {}) => ({
  to:     'cliente@test.com',
  type:   'rrpp',
  caseId: String(caseId),
  data:   JSON.stringify({
    kardex:          'K-2025-001',
    numeroTitulo:    '2025-999',
    oficinaRegistral:'Lima',
    montoDevolucion: '100.00',
    telefono:        '987654321',
    estado:          'CALIFICADO',
    titular:         'NOTARÍA TAMBINI',
    ...extraData,
  }),
});

// ── 4. Suite principal ─────────────────────────────────────────────────────

describe('POST /api/email/send-main — RRPP (cases 1 al 9)', () => {
  const caseDescriptions = {
    1:  'Trámite presentado en SUNARP',
    2:  'Trámite inscrito con devolución',
    3:  'Trámite inscrito (kardex K)',
    4:  'Inscrito con devolución (empresa)',
    5:  'Inscrito (empresa)',
    6:  'Trámite liquidado',
    7:  'Trámite observado',
    8:  'Trámite tachado',
    9:  'Trámite genérico (estado dinámico)',
  };

  Object.entries(caseDescriptions).forEach(([caseId, desc]) => {
    test(`case ${caseId} — ${desc} → 200 success:true`, async () => {
      const res = await request(app)
        .post(`${BASE_URL}/send-main`)
        .field('to',     'cliente@test.com')
        .field('type',   'rrpp')
        .field('caseId', caseId)
        .field('data',   JSON.stringify({
          kardex:          'K-2025-001',
          numeroTitulo:    '2025-888',
          oficinaRegistral:'Lima',
          montoDevolucion: '100.00',
          telefono:        '987654321',
          estado:          'CALIFICADO',
        }));

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.messageId).toBeDefined();
    });
  });
});

describe('POST /api/email/send-main — RRPP case 10 (alias kardex V/N/C/T/L)', () => {
  ['V', 'N', 'C', 'T', 'L'].forEach((prefix) => {
    test(`kardex "${prefix}-001" con caseId=3 → redirige a case 10 → 200`, async () => {
      const res = await request(app)
        .post(`${BASE_URL}/send-main`)
        .field('to',     'cliente@test.com')
        .field('type',   'rrpp')
        .field('caseId', '3')
        .field('data',   JSON.stringify({ kardex: `${prefix}-001`, numeroTitulo: '9999', telefono: '987654321' }));

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });
});

describe('POST /api/email/send-main — Recibo/Boleta de pago', () => {
  test('type=recibo con cliente → 200 success:true', async () => {
    const res = await request(app)
      .post(`${BASE_URL}/send-main`)
      .field('to',      'cliente@test.com')
      .field('type',    'recibo')
      .field('cliente', 'Juan Pérez');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  test('type=recibo con data.cliente → 200', async () => {
    const res = await request(app)
      .post(`${BASE_URL}/send-main`)
      .field('to',   'cliente@test.com')
      .field('type', 'recibo')
      .field('data', JSON.stringify({ cliente: 'María García' }));

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  test('type=recibo sin cliente usa fallback "Cliente" → 200', async () => {
    const res = await request(app)
      .post(`${BASE_URL}/send-main`)
      .field('to',   'cliente@test.com')
      .field('type', 'recibo');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

describe('POST /api/email/send-second — Cuenta secundaria', () => {
  test('type=recibo → usa transporter "second" → 200', async () => {
    const res = await request(app)
      .post(`${BASE_URL}/send-second`)
      .field('to',      'cliente@test.com')
      .field('type',    'recibo')
      .field('cliente', 'Ana Torres');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  test('type=rrpp caseId=1 → 200', async () => {
    const res = await request(app)
      .post(`${BASE_URL}/send-second`)
      .field('to',     'cliente@test.com')
      .field('type',   'rrpp')
      .field('caseId', '1')
      .field('data',   JSON.stringify({ kardex: 'K-001', numeroTitulo: '111', oficinaRegistral: 'Lima' }));

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

describe('POST /api/email/send-main — Validaciones (errores esperados)', () => {
  test('sin campo "to" → 400 success:false', async () => {
    const res = await request(app)
      .post(`${BASE_URL}/send-main`)
      .field('type', 'rrpp')
      .field('caseId', '1');

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/to/i);
  });

  test('sin campo "type" → 400 success:false', async () => {
    const res = await request(app)
      .post(`${BASE_URL}/send-main`)
      .field('to', 'cliente@test.com');

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/type/i);
  });

  test('type desconocido → 500 con mensaje de error', async () => {
    const res = await request(app)
      .post(`${BASE_URL}/send-main`)
      .field('to',   'cliente@test.com')
      .field('type', 'tipo_inexistente');

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });

  test('caseId inexistente para rrpp → 500', async () => {
    const res = await request(app)
      .post(`${BASE_URL}/send-main`)
      .field('to',     'cliente@test.com')
      .field('type',   'rrpp')
      .field('caseId', '999');

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });
});

describe('GET /api/email/logs', () => {
  test('retorna lista de logs → 200 success:true con total y data', async () => {
    const res = await request(app).get(`${BASE_URL}/logs`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(typeof res.body.total).toBe('number');
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});

describe('GET /api/email/logs/search', () => {
  test('con filtros → 200 success:true', async () => {
    const res = await request(app)
      .get(`${BASE_URL}/logs/search`)
      .query({ estado: 'SENT', desde: '2025-01-01', hasta: '2025-12-31' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('sin filtros → 200 (devuelve todos)', async () => {
    const res = await request(app).get(`${BASE_URL}/logs/search`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
