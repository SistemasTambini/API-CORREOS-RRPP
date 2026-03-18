// Case 1 — Trámite presentado en SUNARP
// Variables: kardex, numeroTitulo, oficinaRegistral
const { headerNotaria, footerAviso, horarioBox, cardWrapper, FONT } = require('../components');
const { shouldShowTestimonio } = require('../utils');

module.exports = {
  subject: (data) => `COMUNICACIÓN POR TRÁMITE PRESENTADO - ${data.kardex || ''}`,

  html: ({ kardex, numeroTitulo, oficinaRegistral }) => {
    const showTestimonio = shouldShowTestimonio(kardex);

    const body = `
      ${headerNotaria('#03274A')}

      <tr>
        <td style="padding:20px 24px 0 24px;">
          <h1 style="margin:0 0 8px 0;font-family:${FONT};font-size:20px;line-height:1.3;color:#0F172A;">
            Trámite presentado en SUNARP
          </h1>
        </td>
      </tr>

      <tr>
        <td style="padding:0 24px 8px 24px;font-family:${FONT};font-size:14px;line-height:22px;color:#0F172A;">
          <p style="margin:0 0 12px 0;">Estimado(a) Señor(a):</p>
          <p style="margin:0 0 12px 0;">
            Le informamos que el trámite realizado en <strong>NOTARÍA TAMBINI</strong>, bajo el
            <strong>Kárdex N.º ${kardex}</strong>, ha sido presentado ante <strong>SUNARP</strong> con el
            <strong>Título N.º ${numeroTitulo}</strong>, en la Oficina Registral de
            <strong>${oficinaRegistral}</strong>.
          </p>

          ${horarioBox()}

          ${showTestimonio ? `
          <p style="margin:0 0 12px 0;font-weight:700;">
            Por favor, recuerde recoger su testimonio únicamente dentro del horario de atención.
          </p>` : ''}

          <p style="margin:0 0 12px 0;">
            Agradecemos la confianza depositada en nosotros y quedamos a su disposición para cualquier trámite notarial adicional.
          </p>
          <p style="margin:0 0 14px 0;">
            Para consultar el estado de su trámite en línea, haga clic en el siguiente botón:
          </p>

          <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 16px 0;">
            <tr>
              <td align="left">
                <a href="https://consultas.notariatambini.com/otros-clientes.php" target="_blank"
                   style="display:inline-block;padding:10px 22px;font-family:${FONT};font-size:14px;
                          font-weight:600;text-decoration:none;background:#03274A;color:#FFFFFF;border-radius:6px;">
                  Consulta Web Tambini
                </a>
              </td>
            </tr>
          </table>

          <p style="margin:0 0 6px 0;">Atentamente,</p>
          <p style="margin:0;font-weight:700;color:#0F4C81;">NOTARÍA TAMBINI</p>
        </td>
      </tr>

      ${footerAviso()}`;

    return cardWrapper(body);
  }
};
