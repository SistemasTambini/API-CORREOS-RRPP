/**
 * Validación de variables de entorno al arranque.
 * Si falta alguna variable obligatoria, el servidor no arranca
 * y muestra un mensaje claro en lugar de fallar silenciosamente.
 */
const REQUIRED_VARS = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER_MAIN',
  'SMTP_PASS_MAIN',
  'SMTP_USER_SECOND',
  'SMTP_PASS_SECOND',
  'DB_HOST',
  'DB_PORT',
  'DB_USER',
  'DB_PASSWORD',
  'DB_NAME',
];

function validateEnv() {
  const missing = REQUIRED_VARS.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error('❌ Faltan variables de entorno obligatorias:');
    missing.forEach((key) => console.error(`   - ${key}`));
    process.exit(1);
  }
}

module.exports = { validateEnv };
