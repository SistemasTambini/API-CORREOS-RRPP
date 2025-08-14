function envioReciboPago(nombreCliente) {
  return `
    <!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Recibo de pago – Notaría Tambini</title>
</head>
<body style="margin:0;padding:0;background:#F5F7FB;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#F5F7FB;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640" style="max-width:640px;background:#FFFFFF;border:1px solid #E6EAF0;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="background:#0F4C81;padding:18px 24px;">
              <div style="font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:18px;font-weight:700;color:#FFFFFF;">
                NOTARÍA TAMBINI
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 24px 0 24px;">
              <h1 style="margin:0 0 8px 0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:20px;color:#0F172A;">
                Recibo de pago
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:0 24px 16px 24px;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#0F172A;">
              <p style="margin:0 0 12px 0;">Estimado(a) <strong>${nombreCliente}</strong>,</p>
              <p style="margin:0 0 12px 0;">Adjuntamos el recibo correspondiente a su pago.</p>
              <p style="margin:0 0 12px 0;">Gracias por su preferencia.</p>
              <p style="margin:0 0 6px 0;">Atentamente,</p>
              <p style="margin:0;font-weight:700;color:#0F4C81;">NOTARÍA TAMBINI</p>
            </td>
          </tr>
          <tr>
            <td style="background:#F5F7FB;padding:12px 24px;text-align:center;">
              <p style="margin:0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:12px;color:#64748B;">
                Este mensaje fue enviado automáticamente. Si recibió este correo por error, por favor ignórelo.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>


  `;
}

module.exports = {envioReciboPago}