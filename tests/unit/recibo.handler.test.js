/**
 * Tests unitarios — Recibo Handler
 * Verifica generación de HTML y asunto para el tipo 'recibo' (boleta de pago).
 */
const reciboHandler = require('../../src/handlers/recibo.handler');

describe('recibo.handler — resolveSubject', () => {
  test('retorna asunto default "COMPROBANTE DE PAGO - NOTARIA TAMBINI"', () => {
    const subject = reciboHandler.resolveSubject('', {});
    expect(subject).toBe('COMPROBANTE DE PAGO - NOTARIA TAMBINI');
  });

  test('usa asunto personalizado si se provee', () => {
    const subject = reciboHandler.resolveSubject('', {}, 'Mi asunto custom');
    expect(subject).toBe('Mi asunto custom');
  });
});

describe('recibo.handler — resolveHtml', () => {
  test('genera HTML válido con nombre del cliente', () => {
    const html = reciboHandler.resolveHtml('', { cliente: 'Juan Pérez' });
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('NOTARÍA TAMBINI');
    expect(html).toContain('Juan Pérez');
    expect(html).toContain('Recibo de pago');
  });

  test('usa data.nombreCliente si data.cliente no existe', () => {
    const html = reciboHandler.resolveHtml('', { nombreCliente: 'María García' });
    expect(html).toContain('María García');
  });

  test('usa data.nombre como fallback', () => {
    const html = reciboHandler.resolveHtml('', { nombre: 'Carlos López' });
    expect(html).toContain('Carlos López');
  });

  test('usa "Cliente" cuando no hay ningún nombre', () => {
    const html = reciboHandler.resolveHtml('', {});
    expect(html).toContain('Cliente');
  });

  test('contiene texto de adjunto implícito', () => {
    const html = reciboHandler.resolveHtml('', { cliente: 'Test' });
    expect(html).toContain('recibo correspondiente a su pago');
  });

  test('incluye aviso de mensaje automático en el footer', () => {
    const html = reciboHandler.resolveHtml('', { cliente: 'Test' });
    expect(html).toContain('enviado automáticamente');
  });
});

describe('recibo.handler — resolveCaseId', () => {
  test('retorna el caseId sin modificarlo', () => {
    expect(reciboHandler.resolveCaseId('cualquiera')).toBe('cualquiera');
    expect(reciboHandler.resolveCaseId('')).toBe('');
  });
});
