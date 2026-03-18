/**
 * Tests unitarios — Helpers RRPP
 * Verifica que cada utilidad retorne los valores esperados.
 */
const { shouldShowTestimonio, getWhatsappData } = require('../../src/helpers/rrpp/utils');

describe('shouldShowTestimonio', () => {
  test('retorna true cuando kardex empieza con K', () => {
    expect(shouldShowTestimonio('K-123')).toBe(true);
    expect(shouldShowTestimonio('k-001')).toBe(true);
  });

  test('retorna false para cualquier otra letra', () => {
    ['V', 'N', 'C', 'T', 'L', 'A', 'Z', '1', ''].forEach((prefix) => {
      expect(shouldShowTestimonio(`${prefix}-123`)).toBe(false);
    });
  });

  test('retorna false con kardex vacío o nulo', () => {
    expect(shouldShowTestimonio('')).toBe(false);
    expect(shouldShowTestimonio(null)).toBe(false);
    expect(shouldShowTestimonio(undefined)).toBe(false);
  });
});

describe('getWhatsappData', () => {
  test('agrega prefijo 51 a número de 9 dígitos', () => {
    const { telefonoLink, telefonoTexto } = getWhatsappData('987654321');
    expect(telefonoLink).toBe('51987654321');
    expect(telefonoTexto).toBe('987 654 321');
  });

  test('acepta número de 11 dígitos con prefijo 51', () => {
    const { telefonoLink, telefonoTexto } = getWhatsappData('51987654321');
    expect(telefonoLink).toBe('51987654321');
    expect(telefonoTexto).toBe('987 654 321');
  });

  test('usa número default cuando el valor es vacío', () => {
    const { telefonoLink } = getWhatsappData('');
    expect(telefonoLink).toBe('51977806351');
  });

  test('usa número default cuando el valor es null', () => {
    const { telefonoLink } = getWhatsappData(null);
    expect(telefonoLink).toBe('51977806351');
  });

  test('ignora caracteres no numéricos', () => {
    const { telefonoLink } = getWhatsappData('+51 987-654-321');
    expect(telefonoLink).toBe('51987654321');
  });
});
