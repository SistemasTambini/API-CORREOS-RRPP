/**
 * Jest setup — variables de entorno para tests de integración.
 * Se ejecuta antes de cada test suite.
 * Evita que email.service.js falle por SMTP_USER_* no definidos.
 */
process.env.SMTP_USER_MAIN   = 'test-main@notariatambini.com';
process.env.SMTP_PASS_MAIN   = 'test-pass-main';
process.env.SMTP_USER_SECOND = 'test-second@notariatambini.com';
process.env.SMTP_PASS_SECOND = 'test-pass-second';
process.env.SMTP_HOST        = 'smtp.test.local';
process.env.SMTP_PORT        = '587';
process.env.DB_HOST          = 'localhost';
process.env.DB_PORT          = '3306';
process.env.DB_USER          = 'test';
process.env.DB_PASSWORD      = 'test';
process.env.DB_NAME          = 'test_db';
process.env.PORT             = '3015';
