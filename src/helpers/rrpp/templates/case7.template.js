// Case 7 — Trámite observado
// Variables: kardex, numeroTitulo, montoDevolucion, telefono
const { headerNotaria, footerAviso, horarioBox, cardWrapper, FONT } = require('../components');
const { getWhatsappData } = require('../utils');

module.exports = {
  subject: (data) => `COMUNICACIÓN POR TRÁMITE OBSERVADO - ${data.kardex || ''}`,

  html: (data) => {
    const { telefonoLink, telefonoTexto } = getWhatsappData(data.telefono);

    const body = `
      ${headerNotaria('#0F172A')}

      <tr>
        <td style="padding:20px 24px 0 24px;">
          <h1 style="margin:0 0 8px 0;font-family:${FONT};font-size:20px;line-height:1.3;color:#0F172A;">
            Trámite observado
          </h1>
        </td>
      </tr>

      <tr>
        <td style="padding:0 24px 8px 24px;font-family:${FONT};font-size:14px;line-height:22px;color:#0F172A;">
          <p style="margin:0 0 12px 0;">Estimado(a) Señor(a):</p>
          <p style="margin:0 0 12px 0;">
            Me es grato saludarlo(a) y mediante el presente informarle que el trámite realizado en
            <strong>NOTARÍA TAMBINI</strong>, bajo el
            <strong>N.º  ${data.kardex || '……'}</strong>,
            del cual se ha solicitado la inscripción registral ante <strong>SUNARP</strong>, con N.º de Título
            <strong>${data.numeroTitulo || '………'}</strong>, se encuentra
            <strong style="color:#B45309;">OBSERVADO</strong>, por motivos señalados en la esquela adjunta.
            Tiene derechos pendiente de pago de
            <strong>S/ ${data.montoDevolucion || '0.00'}</strong>.
          </p>
          <p style="margin:0 0 16px 0;">
            Le agradeceremos ponerse en contacto con el asesor legal que lo atendió, a fin de subsanar la observación registral.
          </p>
          <p style="margin:0 0 16px 0;">
            <a href="https://wa.me/${telefonoLink}"
               style="display:inline-block;text-decoration:none;background:#25D366;color:#FFFFFF;
                      font-size:14px;font-weight:600;padding:10px 16px;border-radius:8px;">
              Contactar por WhatsApp (${telefonoTexto})
            </a>
          </p>

          ${horarioBox()}

          <p style="margin:0 0 6px 0;">Atentamente,</p>
          <p style="margin:0;font-weight:700;color:#0F4C81;">NOTARÍA TAMBINI</p>
        </td>
      </tr>

      ${footerAviso()}`;

    return cardWrapper(body);
  }
};
