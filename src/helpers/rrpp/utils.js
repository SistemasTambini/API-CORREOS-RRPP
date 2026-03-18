/**
 * Determina si se debe mostrar el aviso de recojo de testimonio
 * según el primer carácter del kardex (K = mostrar).
 * @param {string} kardex
 * @returns {boolean}
 */
function shouldShowTestimonio(kardex) {
  const first = (kardex || '').toString().trim().charAt(0).toUpperCase();
  return first === 'K';
}

/**
 * Normaliza un número de teléfono peruano para usarlo en botones de WhatsApp.
 * Soporta 9 dígitos (sin código de país) o 11 dígitos con prefijo 51.
 * @param {string|number} telefono
 * @returns {{ telefonoLink: string, telefonoTexto: string }}
 */
function getWhatsappData(telefono) {
  const telefonoRaw = String(telefono || '').trim();
  const telefonoDigits = telefonoRaw.replace(/\D/g, '');

  let telefonoLink = '51977806351';
  let telefonoTexto = '977 806 351';

  if (telefonoDigits) {
    if (telefonoDigits.length === 9) {
      telefonoLink = `51${telefonoDigits}`;
      telefonoTexto = telefonoDigits.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
    } else if (telefonoDigits.length === 11 && telefonoDigits.startsWith('51')) {
      telefonoLink = telefonoDigits;
      telefonoTexto = telefonoDigits.slice(2).replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
    }
  }

  return { telefonoLink, telefonoTexto };
}

module.exports = { shouldShowTestimonio, getWhatsappData };
