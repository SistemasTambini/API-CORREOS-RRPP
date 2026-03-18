/**
 * Tests unitarios — RRPP Handler (Strategy)
 * Verifica resolución de caseId, subject y HTML para los 10 cases.
 */
const rrppHandler = require('../../src/handlers/rrpp.handler');
const rrppTemplates = require('../../src/helpers/rrpp/index');

// Datos mínimos por case para que las templates no exploten
const SAMPLE_DATA = {
  kardex:          'K-2025-001',
  numeroTitulo:    '2025-999',
  oficinaRegistral:'Lima',
  montoDevolucion: '150.00',
  telefono:        '987654321',
  estado:          'CALIFICADO',
  titular:         'NOTARÍA TAMBINI',
};

describe('rrpp.handler — resolveCaseId', () => {
  test('case normal sin transformación', () => {
    expect(rrppHandler.resolveCaseId('1', SAMPLE_DATA)).toBe('1');
    expect(rrppHandler.resolveCaseId('5', SAMPLE_DATA)).toBe('5');
    expect(rrppHandler.resolveCaseId('8', SAMPLE_DATA)).toBe('8');
  });

  test('caseId=3 + kardex K → se mantiene en 3 (K no está en [V,N,C,T,L])', () => {
    expect(rrppHandler.resolveCaseId('3', { kardex: 'K-001' })).toBe('3');
  });

  test('caseId=3 + kardex V → redirige a 10', () => {
    expect(rrppHandler.resolveCaseId('3', { kardex: 'V-001' })).toBe('10');
  });

  test('caseId=3 + kardex N → redirige a 10', () => {
    expect(rrppHandler.resolveCaseId('3', { kardex: 'N-100' })).toBe('10');
  });

  test('caseId=3 + kardex C → redirige a 10', () => {
    expect(rrppHandler.resolveCaseId('3', { kardex: 'C-050' })).toBe('10');
  });

  test('caseId=3 + kardex T → redirige a 10', () => {
    expect(rrppHandler.resolveCaseId('3', { kardex: 'T-999' })).toBe('10');
  });

  test('caseId=3 + kardex L → redirige a 10', () => {
    expect(rrppHandler.resolveCaseId('3', { kardex: 'L-123' })).toBe('10');
  });

  test('caseId=1 con kardex V → NO redirige (solo caseId=3 tiene alias)', () => {
    expect(rrppHandler.resolveCaseId('1', { kardex: 'V-001' })).toBe('1');
  });
});

describe('rrpp.handler — resolveSubject', () => {
  test('usa asunto personalizado si se provee', () => {
    const subject = rrppHandler.resolveSubject('1', SAMPLE_DATA, 'Asunto custom');
    expect(subject).toBe('Asunto custom');
  });

  test('genera asunto dinámico con kardex para cada case', () => {
    for (let i = 1; i <= 10; i++) {
      const subject = rrppHandler.resolveSubject(String(i), SAMPLE_DATA);
      expect(typeof subject).toBe('string');
      expect(subject.length).toBeGreaterThan(0);
      // Todos incluyen el kardex en el asunto
      expect(subject).toContain(SAMPLE_DATA.kardex);
    }
  });

  test('lanza error para caseId no existente', () => {
    expect(() => rrppHandler.resolveSubject('99', SAMPLE_DATA)).toThrow('CaseId 99 no reconocido');
  });
});

describe('rrpp.handler — resolveHtml (los 10 cases)', () => {
  const cases = [
    { id: '1',  title: 'Trámite presentado en SUNARP' },
    { id: '2',  title: 'Trámite Inscrito' },
    { id: '3',  title: 'Trámite inscrito' },
    { id: '4',  title: 'Trámite Inscrito' },
    { id: '5',  title: 'Trámite Inscrito' },
    { id: '6',  title: 'Trámite liquidado' },
    { id: '7',  title: 'Trámite observado' },
    { id: '8',  title: 'Trámite tachado' },
    { id: '9',  title: 'Trámite' },
    { id: '10', title: 'Trámite inscrito' },
  ];

  cases.forEach(({ id, title }) => {
    test(`case ${id} — genera HTML válido que contiene "${title}" y "NOTARÍA TAMBINI"`, () => {
      const html = rrppHandler.resolveHtml(id, SAMPLE_DATA);
      expect(typeof html).toBe('string');
      expect(html).toContain('<!DOCTYPE html>');
      expect(html).toContain('NOTARÍA TAMBINI');
      expect(html).toContain(title);
    });
  });

  test('case 1 — incluye kardex y numeroTitulo en el HTML', () => {
    const html = rrppHandler.resolveHtml('1', SAMPLE_DATA);
    expect(html).toContain(SAMPLE_DATA.kardex);
    expect(html).toContain(SAMPLE_DATA.numeroTitulo);
    expect(html).toContain(SAMPLE_DATA.oficinaRegistral);
  });

  test('case 1 con kardex K — incluye aviso de testimonio', () => {
    const html = rrppHandler.resolveHtml('1', { ...SAMPLE_DATA, kardex: 'K-001' });
    expect(html).toContain('recoger su testimonio');
  });

  test('case 1 con kardex V — NO incluye aviso de testimonio', () => {
    const html = rrppHandler.resolveHtml('1', { ...SAMPLE_DATA, kardex: 'V-001' });
    expect(html).not.toContain('recoger su testimonio');
  });

  test('case 2 — incluye montoDevolucion y botón WhatsApp', () => {
    const html = rrppHandler.resolveHtml('2', SAMPLE_DATA);
    expect(html).toContain(SAMPLE_DATA.montoDevolucion);
    expect(html).toContain('wa.me/51987654321');
  });

  test('case 6 — incluye cuentas bancarias INTERBANK y BCP', () => {
    const html = rrppHandler.resolveHtml('6', SAMPLE_DATA);
    expect(html).toContain('INTERBANK');
    expect(html).toContain('BCP');
  });

  test('case 7 — indica estado OBSERVADO', () => {
    const html = rrppHandler.resolveHtml('7', SAMPLE_DATA);
    expect(html).toContain('OBSERVADO');
    expect(html).toContain(SAMPLE_DATA.montoDevolucion);
  });

  test('case 8 — indica estado TACHADO', () => {
    const html = rrppHandler.resolveHtml('8', SAMPLE_DATA);
    expect(html).toContain('TACHADO');
  });

  test('case 9 — muestra estado dinámico', () => {
    const html = rrppHandler.resolveHtml('9', SAMPLE_DATA);
    expect(html).toContain(SAMPLE_DATA.estado);
  });

  test('lanza error para caseId inexistente', () => {
    expect(() => rrppHandler.resolveHtml('99', SAMPLE_DATA)).toThrow('CaseId 99 no reconocido');
  });
});
