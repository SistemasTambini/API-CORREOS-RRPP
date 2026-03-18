// Case 5 — Trámite inscrito (constitución de empresa)
// Variables: kardex, telefono
const { headerNotaria, footerAviso, horarioBox, whatsappBtn, cardWrapper, FONT } = require('../components');
const { getWhatsappData } = require('../utils');

const DIRECCION = 'Av. Jorge Basadre 280, San Isidro – Lima • <a href="https://www.notariatambini.com" style="color:#0F172A;text-decoration:underline;">notariatambini.com</a>';

module.exports = {
  subject: (data) => `COMUNICACIÓN POR TRÁMITE INSCRITO (CONSTITUCIÓN DE EMPRESA) - ${data.kardex || ''}`,

  html: (data) => {
    const { telefonoLink, telefonoTexto } = getWhatsappData(data.telefono);

    const body = `
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
        Trámite inscrito en Notaría Tambini. Información y horarios dentro del mensaje.
      </div>

      ${headerNotaria('#0F172A')}

      <tr>
        <td style="padding:22px 24px 0 24px;">
          <h1 style="margin:0 0 8px 0;font-family:${FONT};font-size:22px;line-height:1.35;color:#0F172A;">
            Trámite Inscrito
          </h1>
          <p style="margin:0 0 14px 0;font-family:${FONT};font-size:12px;color:#64748B;">
            Kárdex: <strong style="color:#0F172A;">${data.kardex || '.............................'}</strong>
          </p>
        </td>
      </tr>

      <tr>
        <td style="padding:0 24px 8px 24px;">
          <p style="margin:0 0 12px 0;font-family:${FONT};font-size:14px;line-height:22px;color:#0F172A;">
            Estimado(a) Señor(a):
          </p>
          <p style="margin:0 0 14px 0;font-family:${FONT};font-size:14px;line-height:22px;color:#0F172A;">
            Me es grato saludarlo(a) e informarle que el trámite realizado en
            <strong>NOTARÍA TAMBINI</strong>, bajo el Kárdex
            <strong>${data.kardex || '.............................'}</strong>, se encuentra <strong>INSCRITO</strong>.
          </p>

          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                 style="margin:0 0 14px 0;background:#F8FAFC;border:1px solid #E6EAF0;border-radius:10px;">
            <tr>
              <td style="padding:12px 14px;">
                <p style="margin:0;font-family:${FONT};font-size:14px;line-height:22px;color:#0F172A;">
                  Asimismo, por el presente correo se adjunta INSCRIPCIÓN y RUC.
                </p>
              </td>
            </tr>
          </table>

          <p style="margin:0 0 16px 0;font-family:${FONT};font-size:14px;line-height:22px;color:#0F172A;">
            No olvide recoger su testimonio dentro del horario de atención.
          </p>

          ${whatsappBtn(telefonoLink, telefonoTexto)}
          ${horarioBox()}

          <p style="margin:0 0 16px 0;font-family:${FONT};font-size:14px;line-height:22px;color:#0F172A;">
            <strong>RECUERDE CERTIFICAR LA APERTURA DE SUS LIBROS CONTABLES Y SOCIETARIOS</strong>
            (ACTAS Y MATRÍCULA DE ACCIONES), contamos con una tarifa especial y podrá hacerlo valer en el área Extraprotocolar.
          </p>
          <p style="margin:0 0 12px 0;font-family:${FONT};font-size:14px;line-height:22px;color:#0F172A;">
            Agradecemos la confianza depositada en nosotros y quedamos a su entera disposición para cualquier trámite notarial adicional.
          </p>
          <p style="margin:0 0 8px 0;font-family:${FONT};font-size:14px;line-height:22px;color:#0F172A;">
            Atentamente,<strong> Notaría Tambini.</strong>
          </p>
        </td>
      </tr>

      ${footerAviso(DIRECCION)}`;

    return cardWrapper(body, '0 2px 6px rgba(15,23,42,0.05)');
  }
};
