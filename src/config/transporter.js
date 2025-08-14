const nodemailer = require('nodemailer');
require('dotenv').config();

const createTransporter = (user, pass) => {
  return nodemailer.createTransport({
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    rateLimit: 10,
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: false, // Office365 = TLS en 587
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 20000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  });
};

module.exports = {
  main: createTransporter(process.env.SMTP_USER_MAIN, process.env.SMTP_PASS_MAIN),
  second: createTransporter(process.env.SMTP_USER_SECOND, process.env.SMTP_PASS_SECOND),
};
