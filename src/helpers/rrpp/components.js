/**
 * Bloques HTML reutilizables para las plantillas de correo RRPP.
 * Cada función retorna un string HTML listo para interpolarse.
 */

const FONT = 'Segoe UI,Roboto,Arial,Helvetica,sans-serif';

/**
 * Header de la notaría con color de fondo configurable.
 * @param {string} bgColor  Color de fondo (hex). Default: '#03274A'
 */
const headerNotaria = (bgColor = '#03274A') => `
  <tr>
    <td style="background:${bgColor};padding:18px 24px;">
      <div style="font-family:${FONT};font-size:18px;font-weight:700;color:#FFFFFF;letter-spacing:.4px;">
        NOTARÍA TAMBINI
      </div>
    </td>
  </tr>`;

/**
 * Footer estándar con aviso de mensaje automático.
 * @param {string} [extraLine]  Línea adicional bajo el aviso (e.g. dirección).
 */
const footerAviso = (extraLine = '') => `
  <tr>
    <td style="background:#F5F7FB;padding:14px 24px;text-align:center;">
      <p style="margin:0${extraLine ? ' 6px 6px' : ''};font-family:${FONT};font-size:12px;color:#64748B;">
        Este mensaje fue enviado automáticamente. Si recibió este correo por error, por favor ignórelo.
      </p>
      ${extraLine ? `<p style="margin:0;font-family:${FONT};font-size:12px;color:#64748B;">${extraLine}</p>` : ''}
    </td>
  </tr>`;

/**
 * Caja de horario de atención estándar.
 */
const horarioBox = () => `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
         style="margin:0 0 16px 0;">
    <tr>
      <td style="padding:12px 14px;border:1px solid #E6EAF0;border-radius:8px;background:#F8FAFC;">
        <p style="margin:0 0 6px 0;font-family:${FONT};font-size:13px;font-weight:700;color:#0F172A;">Horario de atención</p>
        <p style="margin:0;font-family:${FONT};font-size:13px;line-height:20px;color:#0F172A;">
          Lunes a viernes: 8:00 a. m. – 6:00 p. m. (horario corrido)<br/>
          Sábados: 9:00 a. m. – 12:00 p. m.
        </p>
      </td>
    </tr>
  </table>`;

/**
 * Botón de WhatsApp verde.
 * @param {string} link    Número destino con prefijo de país (ej: "51998152812")
 * @param {string} texto   Texto visible del número (ej: "998 152 812")
 * @param {string} [label] Texto del botón. Default: "Escribir por WhatsApp"
 */
const whatsappBtn = (link, texto, label = 'Escribir por WhatsApp') => `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="left"
         style="margin:0 0 18px 0;">
    <tr>
      <td align="left">
        <a href="https://wa.me/${link}"
           style="display:inline-block;text-decoration:none;background:#25D366;color:#FFFFFF;
                  font-family:${FONT};font-size:14px;font-weight:700;padding:10px 16px;border-radius:8px;">
          ${label} (${texto})
        </a>
      </td>
    </tr>
  </table>
  <div style="clear:both;"></div>`;

/**
 * Envuelve el contenido en el card/contenedor blanco estándar de 640px.
 * @param {string} content  HTML interno del card
 * @param {string} [shadow] CSS box-shadow adicional (opcional)
 */
const cardWrapper = (content, shadow = '') => `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
</head>
<body style="margin:0;padding:0;background:#F5F7FB;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
         style="background:#F5F7FB;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640"
               style="max-width:640px;background:#FFFFFF;border:1px solid #E6EAF0;
                      border-radius:12px;overflow:hidden;${shadow ? `box-shadow:${shadow};` : ''}">
          ${content}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

module.exports = { headerNotaria, footerAviso, horarioBox, whatsappBtn, cardWrapper, FONT };
