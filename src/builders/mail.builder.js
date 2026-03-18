/**
 * MailBuilder
 * Construye el objeto mailOptions listo para transporter.sendMail().
 */

/**
 * @param {{ from, to, cc, bcc, replyTo, subject, html, attachments }} params
 * @returns {object} mailOptions
 */
function build({ from, to, cc, bcc, replyTo, subject, html, attachments = [] }) {
  return {
    from,
    to,
    subject,
    html,
    ...(attachments.length ? { attachments } : {}),
    ...(cc      ? { cc }      : {}),
    ...(bcc     ? { bcc }     : {}),
    ...(replyTo ? { replyTo } : {}),
  };
}

module.exports = { build };
