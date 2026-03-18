// Case 10 — Trámite inscrito (para kardex con prefijos V, N, C, T, L)
// Alias automático de caseId=3 para ciertos prefijos de kardex (ver email.service.js → resolveTemplateCaseId)
// Variables: kardex, numeroTitulo, telefono
const { headerNotaria, footerAviso, horarioBox, cardWrapper, FONT } = require('../components');
const { getWhatsappData } = require('../utils');

module.exports = {
  subject: (data) => `COMUNICACIÓN POR TRÁMITE INSCRITO - ${data.kardex || ''}`,

  html: (data) => {
    const { telefonoLink, telefonoTexto } = getWhatsappData(data.telefono);

    const body = `
      ${headerNotaria('#03274A')}

      <tr>
        <td style="padding:20px 24px 0 24px;">
          <h1 style="margin:0 0 8px 0;font-family:${FONT};font-size:20px;line-height:1.3;color:#0F172A;">
            Trámite inscrito
          </h1>
          <p style="margin:0 0 12px 0;font-family:${FONT};font-size:12px;color:#64748B;">
            Kárdex: <strong style="color:#0F172A;">${data.kardex || '.............................'}</strong>
            &nbsp;|&nbsp;
            Título N.º <strong style="color:#0F172A;">${data.numeroTitulo || '.............................'}</strong>
          </p>
        </td>
      </tr>

      <tr>
        <td style="padding:0 24px 8px 24px;font-family:${FONT};font-size:14px;line-height:22px;color:#0F172A;">
          <p style="margin:0 0 12px 0;">Estimado(a) Señor(a):</p>
          <p style="margin:0 0 12px 0;">
            Me es grato saludarlo(a), y mediante el presente informarle que el trámite realizado en
            <strong>NOTARÍA TAMBINI</strong>, bajo el
            <strong>${data.kardex || '.............................'}</strong> N.º
            <strong>${data.numeroTitulo || '...........................................'}</strong>,
            se encuentra <strong>INSCRITO</strong>.
          </p>

          <p style="margin:0 0 16px 0;">
            <a href="https://wa.me/${telefonoLink}"
               style="display:inline-block;text-decoration:none;background:#25D366;color:#FFFFFF;
                      font-family:${FONT};font-size:14px;font-weight:700;padding:10px 16px;border-radius:8px;">
              Escribir por WhatsApp (${telefonoTexto})
            </a>
          </p>

          ${horarioBox()}

          <p style="margin:0 0 12px 0;">
            Agradecemos la confianza depositada en nosotros y quedamos a su entera disposición para cualquier trámite notarial adicional.
          </p>
          <p style="margin:0 0 6px 0;">Atentamente,</p>
          <p style="margin:0;font-weight:700;color:#0F4C81;">NOTARÍA TAMBINI</p>
        </td>
      </tr>

      ${footerAviso()}`;

    return cardWrapper(body);
  }
};
