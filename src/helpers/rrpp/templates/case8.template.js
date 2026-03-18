// Case 8 — Trámite tachado
// Variables: kardex, numeroTitulo
const { headerNotaria, footerAviso, horarioBox, cardWrapper, FONT } = require('../components');

module.exports = {
  subject: (data) => `COMUNICACIÓN POR TRÁMITE TACHADO - ${data.kardex || ''}`,

  html: (data) => {
    const body = `
      ${headerNotaria('#0F172A')}

      <tr>
        <td style="padding:20px 24px 0 24px;">
          <h1 style="margin:0 0 8px 0;font-family:${FONT};font-size:20px;line-height:1.3;color:#0F172A;">
            Trámite tachado
          </h1>
        </td>
      </tr>

      <tr>
        <td style="padding:0 24px 8px 24px;font-family:${FONT};font-size:14px;line-height:22px;color:#0F172A;">
          <p style="margin:0 0 12px 0;">Estimado(a) Señor(a):</p>
          <p style="margin:0 0 12px 0;">
            Me es grato saludarlo(a) y mediante el presente informarle que el trámite realizado en
            <strong>NOTARÍA TAMBINI</strong>, bajo el
            <strong>N.º  ${data.kardex || '……'}</strong>
            del cual se ha solicitado la inscripción registral ante <strong>SUNARP</strong>, con N.º de Título
            <strong>${data.numeroTitulo || '……….'}</strong>, se encuentra
            <strong style="color:#D9534F;">TACHADO</strong>, por motivos señalados en la esquela adjunta.
          </p>
          <p style="margin:0 0 12px 0;">
            En caso de cualquier consulta, le agradeceremos comunicarse con el asesor legal que atendió su trámite.
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
