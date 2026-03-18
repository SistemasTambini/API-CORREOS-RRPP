// Case 6 — Trámite liquidado
// Variables: kardex, numeroTitulo, montoDevolucion, telefono, titular
const { headerNotaria, footerAviso, cardWrapper, FONT } = require('../components');
const { getWhatsappData } = require('../utils');

module.exports = {
  subject: (data) => `COMUNICACIÓN POR TRÁMITE LIQUIDADO - ${data.kardex || ''}`,

  html: (data) => {
    const { telefonoLink, telefonoTexto } = getWhatsappData(data.telefono);

    const body = `
      ${headerNotaria('#0F172A')}

      <tr>
        <td style="padding:20px 24px 0 24px;">
          <h1 style="margin:0 0 8px 0;font-family:${FONT};font-size:20px;line-height:1.3;color:#0F172A;">
            Trámite liquidado
          </h1>
        </td>
      </tr>

      <tr>
        <td style="padding:0 24px 8px 24px;font-family:${FONT};font-size:14px;line-height:22px;color:#0F172A;">
          <p style="margin:0 0 12px 0;">Estimado(a) Señor(a):</p>
          <p style="margin:0 0 12px 0;">
            Me es grato saludarlo(a) y mediante el presente informarle que el trámite realizado en
            <strong>NOTARÍA TAMBINI</strong>, bajo el
            <strong>${data.kardex || '……'}</strong> N.º
            <strong>${data.numeroTitulo || '………….'}</strong>, se encuentra
            <strong style="color:#15803D;">LIQUIDADO</strong>, siendo el monto del mayor derecho de
            <strong>S/. ${data.montoDevolucion || '0.00'}</strong>, por lo que ponemos a su disposición las cuentas de derechos registrales de NOTARÍA TAMBINI:
          </p>

          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                 style="margin:0 0 16px 0;background:#F8FAFC;border:1px solid #E6EAF0;border-radius:8px;">
            <tr>
              <td style="padding:12px 14px;">
                <p style="margin:0 0 6px 0;font-size:13px;color:#64748B;">Resumen de liquidación</p>
                <p style="margin:0;font-size:14px;color:#0F172A;">
                  Kárdex: <strong>${data.kardex || '……'}</strong> &nbsp;|&nbsp;
                  Título N.º <strong>${data.numeroTitulo || '………….'}</strong><br/>
                  Mayor derecho: <strong>S/. ${data.montoDevolucion || '0.00'}</strong>
                </p>
              </td>
            </tr>
          </table>

          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                 style="margin:0 0 16px 0;border:1px solid #E6EAF0;border-radius:8px;">
            <tr>
              <td style="padding:12px 14px;">
                <p style="margin:0 8px 10px 0;font-size:13px;font-weight:700;color:#0F172A;">Cuentas de derechos registrales</p>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                       style="border-collapse:collapse;font-size:13px;">
                  <tr>
                    <th align="left" style="padding:8px;border-bottom:1px solid #E6EAF0;color:#64748B;font-weight:600;">Banco</th>
                    <th align="left" style="padding:8px;border-bottom:1px solid #E6EAF0;color:#64748B;font-weight:600;">Cuenta</th>
                    <th align="left" style="padding:8px;border-bottom:1px solid #E6EAF0;color:#64748B;font-weight:600;">CCI</th>
                  </tr>
                  <tr>
                    <td style="padding:8px;border-bottom:1px solid #F1F5F9;color:#0F172A;">INTERBANK</td>
                    <td style="padding:8px;border-bottom:1px solid #F1F5F9;color:#0F172A;">898 3163156603</td>
                    <td style="padding:8px;border-bottom:1px solid #F1F5F9;color:#0F172A;">003 989 013163156603 44</td>
                  </tr>
                  <tr>
                    <td style="padding:8px;border-bottom:1px solid #F1F5F9;color:#0F172A;">BCP</td>
                    <td style="padding:8px;border-bottom:1px solid #F1F5F9;color:#0F172A;">193 - 1151949 0 46</td>
                    <td style="padding:8px;border-bottom:1px solid #F1F5F9;color:#0F172A;">002 193 001151949046 17</td>
                  </tr>
                </table>
                <p style="margin:12px 0 0 0;font-size:12px;color:#64748B;">
                  Titular: <strong style="color:#0F172A;">${data.titular || 'NOTARÍA TAMBINI'}</strong>
                </p>
              </td>
            </tr>
          </table>

          <p style="margin:0 0 12px 0;">
            Le agradeceremos enviar la constancia del depósito indicando la fecha y hora, y comunicarse con el asesor legal que atendió su trámite.
          </p>

          <p style="margin:0 0 16px 0;">
            <a href="https://wa.me/${telefonoLink}"
               style="display:inline-block;text-decoration:none;background:#25D366;color:#FFFFFF;
                      font-size:14px;font-weight:600;padding:10px 16px;border-radius:8px;">
              Enviar constancia por WhatsApp (${telefonoTexto})
            </a>
          </p>

          <p style="margin:0 0 6px 0;">Atentamente,</p>
          <p style="margin:0;font-weight:700;color:#0F4C81;">NOTARÍA TAMBINI</p>
        </td>
      </tr>

      ${footerAviso()}`;

    return cardWrapper(body);
  }
};
