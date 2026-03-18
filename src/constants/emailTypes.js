/**
 * Constantes de tipos de email y cuentas SMTP.
 * Elimina strings mágicos dispersos por el código.
 */
const EMAIL_TYPES = Object.freeze({
  RRPP:   'rrpp',
  RECIBO: 'recibo',
});

const ACCOUNT_TYPES = Object.freeze({
  MAIN:   'main',
  SECOND: 'second',
});

module.exports = { EMAIL_TYPES, ACCOUNT_TYPES };
