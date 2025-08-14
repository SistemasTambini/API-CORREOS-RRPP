function envioReciboPago(nombreCliente, monto, fecha) {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <p>Estimado(a) <strong>${nombreCliente}</strong>,</p>
      <p>Adjunto encontrará el recibo correspondiente a su pago de <strong>S/. ${monto}</strong> realizado el <strong>${fecha}</strong>.</p>
      <p>Gracias por su preferencia.</p>
      <p>Atentamente,</p>
      <p><strong>NOTARIA TAMBINI</strong></p>
    </div>
  `;
}

module.exports = {envioReciboPago}