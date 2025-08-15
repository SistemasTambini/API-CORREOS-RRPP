// helpers/rrpp.template.js
const rrppTemplates = {
  1: {
    subject: 'COMUNICACIÓN POR TRÁMITE PRESENTADO',
    html: ({ kardex, numeroTitulo }) => `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <p>Estimado(a) Señor(a):</p>
        <p>
          Me es grato saludarlo(a), y mediante el presente informarle que el trámite realizado en 
          <strong>NOTARIA TAMBINI</strong>, bajo el <strong>Kardex N° ${kardex}</strong>, ha sido presentado a 
          <strong>SUNARP</strong> bajo el número de título <strong>${numeroTitulo}</strong>.
        </p>
        <p>
          Nuestro horario de atención es de:<br/>
          Lunes a viernes de 8:00am a 6:00pm (horario corrido) - sábados de 9:00 am a 12:00 pm
        </p>
        <p style="font-weight: bold;">
          No olvide recoger su testimonio dentro del horario de atención.
        </p>
        <p>
          Agradecemos la confianza depositada en nosotros y quedamos a su entera disposición 
          para cualquier trámite notarial adicional.
        </p>
        <p>Atentamente,</p>
        <p><strong>NOTARIA TAMBINI</strong></p>
      </div>
    `
  },
  // 2. Trámite inscrito con devolución
  2: {
    subject: 'COMUNICACIÓN POR TRÁMITE INSCRITO CON DEVOLUCIÓN',
    html: (data) => `
  <!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta http-equiv="x-ua-compatible" content="ie=edge" />
<title>Notaría Tambini – Trámite inscrito</title>
<!-- Preheader (texto de vista previa) -->
<style>
/* Nada de CSS externo por compatibilidad; todo va inline abajo */
</style>
</head>
<body style="margin:0;padding:0;background:#F5F7FB;">
  <!-- Preheader oculto -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    Trámite inscrito en Notaría Tambini. Información y horarios dentro del mensaje.
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#F5F7FB;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <!-- Card -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640" style="max-width:640px;background:#FFFFFF;border:1px solid #E6EAF0;border-radius:14px;overflow:hidden;box-shadow:0 2px 6px rgba(15,23,42,0.05);">
          
          <!-- Header -->
          <tr>
            <td style="background:#03274A;padding:18px 24px;">
              <!-- Reemplaza por <img> si tienes logo -->
              <div style="font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:18px;font-weight:700;color:#FFFFFF;letter-spacing:.4px;">
                NOTARÍA TAMBINI
              </div>
            </td>
          </tr>

          <!-- Title + meta -->
          <tr>
            <td style="padding:22px 24px 0 24px;">
              <h1 style="margin:0 0 8px 0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:22px;line-height:1.35;color:#0F172A;">
                Trámite Inscrito
              </h1>
              <p style="margin:0 0 14px 0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:12px;color:#64748B;">
                Kárdex: <strong style="color:#0F172A;">${data.kardex || '.............................'}</strong>
                &nbsp;•&nbsp;
                Título N.º <strong style="color:#0F172A;">${data.numeroTitulo || '.............................'}</strong>
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:0 24px 8px 24px;">
              <p style="margin:0 0 12px 0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#0F172A;">
                Estimado(a) Señor(a):
              </p>

              <p style="margin:0 0 14px 0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#0F172A;">
                Me es grato saludarlo(a) e informarle que el trámite realizado en
                <strong>NOTARÍA TAMBINI</strong>, bajo el Kárdex
                <strong>${data.kardex || '.............................'}</strong>
                y el Título N.º <strong>${data.numeroTitulo || '.............................'}</strong>,
                se encuentra <strong>INSCRITO</strong>.
              </p>

              <!-- Info box -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 14px 0;background:#F8FAFC;border:1px solid #E6EAF0;border-radius:10px;">
                <tr>
                  <td style="padding:12px 14px;">
                    <p style="margin:0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#0F172A;">
                      Asimismo, tiene un monto por devolverse de la SUNARP por
                      <strong>S/${(data.montoDevolucion || '0.00')}</strong>.
                      La devolución se efectúa en un plazo de <strong>30 días calendario</strong>,
                      contados desde la solicitud correspondiente.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 16px 0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#0F172A;">
                No olvide recoger su testimonio dentro del horario de atención. Contamos con servicio de
                entrega de documentos a domicilio con tarifa especial.
              </p>

              <!-- CTA (botón bulletproof con VML para Outlook) -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="left" style="margin:0 0 18px 0;">
                <tr>
                  <td align="left">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"
                      href="https://wa.me/51977806351" style="height:40px;v-text-anchor:middle;width:280px;" arcsize="12%"
                      stroke="f" fillcolor="#25D366">
                      <w:anchorlock/>
                      <center style="color:#FFFFFF;font-family:Segoe UI,Arial,sans-serif;font-size:14px;font-weight:700;">
                        Escribir por WhatsApp (977 806 351)
                      </center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-- -->
                    <a href="https://wa.me/51977806351"
                       style="display:inline-block;text-decoration:none;background:#25D366;color:#FFFFFF;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;padding:10px 16px;border-radius:8px;">
                       Escribir por WhatsApp (977 806 351)
                    </a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>

              <div style="clear:both;"></div>

              <!-- Horario -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 16px 0;">
                <tr>
                  <td style="padding:12px 14px;border:1px solid #E6EAF0;border-radius:10px;">
                    <p style="margin:0 0 6px 0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:.3px;color:#0F172A;font-weight:700;">
                      Horario de atención
                    </p>
                    <p style="margin:0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;color:#0F172A;">
                      Lunes a viernes: 8:00 a. m. – 6:00 p. m. (horario corrido)<br />
                      Sábados: 9:00 a. m. – 12:00 p. m.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 12px 0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#0F172A;">
                Agradecemos la confianza depositada en nosotros y quedamos a su entera disposición para cualquier trámite notarial adicional.
              </p>

              <p style="margin:0 0 8px 0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#0F172A;">
                Atentamente, Notaría Tambini.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F5F7FB;padding:14px 24px;text-align:center;">
              <p style="margin:0 6px 6px;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:12px;color:#64748B;">
                Este mensaje fue enviado automáticamente. Si recibió este correo por error, por favor ignórelo.
              </p>
              <p style="margin:0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:12px;color:#64748B;">
                Av. Jorge Basadre 280, San Isidro – Lima • <a href="https://www.notariatambini.com" style="color:#0F172A;text-decoration:underline;">notariatambini.com</a>
              </p>
            </td>
          </tr>
        </table>
        <!-- /Card -->
      </td>
    </tr>
  </table>
</body>
</html>

    `
  },

  // 3. Trámite inscrito
  3: {
    subject: 'COMUNICACIÓN POR TRÁMITE INSCRITO',
    html: (data) => `
      <!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Notaría Tambini – Trámite inscrito</title>
</head>
<body style="margin:0;padding:0;background:#F5F7FB;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#F5F7FB;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <!-- Card -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640" style="max-width:640px;background:#FFFFFF;border:1px solid #E6EAF0;border-radius:12px;overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:#0F4C81;padding:18px 24px;">
              <div style="font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:18px;font-weight:700;color:#FFFFFF;letter-spacing:.4px;">
                NOTARÍA TAMBINI
              </div>
            </td>
          </tr>

          <!-- Title + meta -->
          <tr>
            <td style="padding:20px 24px 0 24px;">
              <h1 style="margin:0 0:8px 0;margin-bottom:8px;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:20px;line-height:1.3;color:#0F172A;">
                Trámite inscrito
              </h1>
              <p style="margin:0 0 12px 0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:12px;color:#64748B;">
                Kárdex: <strong style="color:#0F172A;">${data.kardex || '.............................'}</strong>
                &nbsp;|&nbsp;
                Título N.º <strong style="color:#0F172A;">${data.numeroTitulo || '.............................'}</strong>
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:0 24px 8px 24px;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#0F172A;">

              <p style="margin:0 0 12px 0;">Estimado(a) Señor(a):</p>

              <p style="margin:0 0 12px 0;">
                Me es grato saludarlo(a), y mediante el presente informarle que el trámite realizado en 
                <strong>NOTARÍA TAMBINI</strong>, bajo el 
                <strong>${data.kardex || '.............................'}</strong> N.º 
                <strong>${data.numeroTitulo || '...........................................'}</strong>, 
                se encuentra <strong>INSCRITO</strong>.
              </p>

              <p style="margin:0 0 12px 0;">
                No olvide recoger su testimonio dentro del horario de atención. Contamos con el servicio de entrega de documentos a domicilio con tarifa especial; escríbanos al WhatsApp 
                <a href="https://wa.me/51977806351" style="color:#0F4C81;text-decoration:none;">977 806 351</a>.
              </p>

              <!-- CTA WhatsApp -->
              <p style="margin:0 0 16px 0;">
                <a href="https://wa.me/51977806351"
                   style="display:inline-block;text-decoration:none;background:#25D366;color:#FFFFFF;font-size:14px;font-weight:600;padding:10px 16px;border-radius:8px;">
                   Escribir por WhatsApp
                </a>
              </p>

              <!-- Horario -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 16px 0;">
                <tr>
                  <td style="padding:12px 14px;border:1px solid #E6EAF0;border-radius:8px;background:#F8FAFC;">
                    <p style="margin:0 0 6px 0;font-size:13px;font-weight:700;color:#0F172A;">Horario de atención</p>
                    <p style="margin:0;font-size:13px;line-height:20px;color:#0F172A;">
                      Lunes a viernes: 8:00 a. m. – 6:00 p. m. (horario corrido)<br />
                      Sábados: 9:00 a. m. – 12:00 p. m.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 12px 0;">
                Agradecemos la confianza depositada en nosotros y quedamos a su entera disposición para cualquier trámite notarial adicional.
              </p>

              <p style="margin:0 0 6px 0;">Atentamente,</p>
              <p style="margin:0;font-weight:700;color:#0F4C81;">NOTARÍA TAMBINI</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F5F7FB;padding:14px 24px;text-align:center;">
              <p style="margin:0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:12px;color:#64748B;">
                Este mensaje fue enviado automáticamente. Si recibió este correo por error, por favor ignórelo.
              </p>
            </td>
          </tr>
        </table>
        <!-- /Card -->
      </td>
    </tr>
  </table>
</body>
</html>

    `
  },

  // 4. Trámite inscrito con devolución (constitución empresa)
  4: {
    subject: 'COMUNICACIÓN POR TRÁMITE INSCRITO CON DEVOLUCIÓN (CONSTITUCIÓN DE EMPRESA)',
    html: (data) => `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta http-equiv="x-ua-compatible" content="ie=edge" />
<title>Notaría Tambini – Trámite inscrito</title>
<!-- Preheader (texto de vista previa) -->
<style>
/* Nada de CSS externo por compatibilidad; todo va inline abajo */
</style>
</head>
<body style="margin:0;padding:0;background:#F5F7FB;">
  <!-- Preheader oculto -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    Trámite inscrito en Notaría Tambini. Información y horarios dentro del mensaje.
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#F5F7FB;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <!-- Card -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640" style="max-width:640px;background:#FFFFFF;border:1px solid #E6EAF0;border-radius:14px;overflow:hidden;box-shadow:0 2px 6px rgba(15,23,42,0.05);">
          
          <!-- Header -->
          <tr>
            <td style="background:#03274A;padding:18px 24px;">
              <!-- Reemplaza por <img> si tienes logo -->
              <div style="font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:18px;font-weight:700;color:#FFFFFF;letter-spacing:.4px;">
                NOTARÍA TAMBINI
              </div>
            </td>
          </tr>

          <!-- Title + meta -->
          <tr>
            <td style="padding:22px 24px 0 24px;">
              <h1 style="margin:0 0 8px 0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:22px;line-height:1.35;color:#0F172A;">
                Trámite Inscrito
              </h1>
              <p style="margin:0 0 14px 0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:12px;color:#64748B;">
                Kárdex: <strong style="color:#0F172A;">${data.kardex || '.............................'}</strong>
              </p>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:0 24px 8px 24px;">
              <p style="margin:0 0 12px 0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#0F172A;">
                Estimado(a) Señor(a):
              </p>

              <p style="margin:0 0 14px 0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#0F172A;">
                Me es grato saludarlo(a) e informarle que el trámite realizado en
                <strong>NOTARÍA TAMBINI</strong>, bajo el Kárdex
                <strong>${data.kardex || '.............................'}</strong>, se encuentra <strong>INSCRITO</strong>.
              </p>

              <!-- Info box -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 14px 0;background:#F8FAFC;border:1px solid #E6EAF0;border-radius:10px;">
                <tr>
                  <td style="padding:12px 14px;">
                    <p style="margin:0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#0F172A;">
                    Asimismo, por el presente correo se adjunta INSCRIPCIÓN y RUC, tiene un monto por devolverse de la SUNARP la suma de <strong>S/${(data.montoDevolucion || '0.00')}</strong>.
                      No olvidar que la devolución se efectúa en un plazo de <strong>30 días calendario</strong>,
                      contados desde la solicitud correspondiente.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 16px 0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#0F172A;">
                No olvide recoger su testimonio dentro del horario de atención. En caso de requerir Testimonio digital.
              </p>

              <!-- CTA (botón bulletproof con VML para Outlook) -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="left" style="margin:0 0 18px 0;">
                <tr>
                  <td align="left">
           
                    <!--[if !mso]><!-- -->
                    <a href="https://wa.me/51977806351"
                       style="display:inline-block;text-decoration:none;background:#25D366;color:#FFFFFF;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;padding:10px 16px;border-radius:8px;">
                       Escribir por WhatsApp (977 806 351)
                    </a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>

              <div style="clear:both;"></div>

              <!-- Horario -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 16px 0;">
                <tr>
                  <td style="padding:12px 14px;border:1px solid #E6EAF0;border-radius:10px;">
                    <p style="margin:0 0 6px 0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:.3px;color:#0F172A;font-weight:700;">
                      Horario de atención
                    </p>
                    <p style="margin:0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;color:#0F172A;">
                      Lunes a viernes: 8:00 a. m. – 6:00 p. m. (horario corrido)<br />
                      Sábados: 9:00 a. m. – 12:00 p. m.
                    </p>
                  </td>
                </tr>
              </table>
              
<p style="margin:0 0 16px 0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#0F172A;"><strong>RECUERDE CERTIFICAR LA APERTURA DE SUS LIBROS CONTABLES Y SOCIETARIOS</strong> (ACTAS Y MATRÍCULA DE ACCIONES), contamos con una tarifa especial y podrá hacerlo valer en el área Extraprotocolar.</p>
              

              <p style="margin:0 0 12px 0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#0F172A;">
                Agradecemos la confianza depositada en nosotros y quedamos a su entera disposición para cualquier trámite notarial adicional.
              </p>

              <p style="margin:0 0 8px 0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#0F172A;">
                Atentamente,<strong> Notaría Tambini.</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F5F7FB;padding:14px 24px;text-align:center;">
              <p style="margin:0 6px 6px;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:12px;color:#64748B;">
                Este mensaje fue enviado automáticamente. Si recibió este correo por error, por favor ignórelo.
              </p>
              <p style="margin:0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:12px;color:#64748B;">
                Av. Jorge Basadre 280, San Isidro – Lima • <a href="https://www.notariatambini.com" style="color:#0F172A;text-decoration:underline;">notariatambini.com</a>
              </p>
            </td>
          </tr>
        </table>
        <!-- /Card -->
      </td>
    </tr>
  </table>
</body>
</html>

    `
  },

  // 5. Trámite inscrito (constitución empresa)
  5: {
    subject: 'COMUNICACIÓN POR TRÁMITE INSCRITO (CONSTITUCIÓN DE EMPRESA)',
    html: (data) => `
<!-- EN PRUEBA-->
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta http-equiv="x-ua-compatible" content="ie=edge" />
<title>Notaría Tambini – Trámite inscrito</title>
<!-- Preheader (texto de vista previa) -->
<style>
/* Nada de CSS externo por compatibilidad; todo va inline abajo */
</style>
</head>
<body style="margin:0;padding:0;background:#F5F7FB;">
  <!-- Preheader oculto -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    Trámite inscrito en Notaría Tambini. Información y horarios dentro del mensaje.
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#F5F7FB;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <!-- Card -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640" style="max-width:640px;background:#FFFFFF;border:1px solid #E6EAF0;border-radius:14px;overflow:hidden;box-shadow:0 2px 6px rgba(15,23,42,0.05);">
          
          <!-- Header -->
          <tr>
            <td style="background:#03274A;padding:18px 24px;">
              <!-- Reemplaza por <img> si tienes logo -->
              <div style="font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:18px;font-weight:700;color:#FFFFFF;letter-spacing:.4px;">
                NOTARÍA TAMBINI
              </div>
            </td>
          </tr>

          <!-- Title + meta -->
          <tr>
            <td style="padding:22px 24px 0 24px;">
              <h1 style="margin:0 0 8px 0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:22px;line-height:1.35;color:#0F172A;">
                Trámite Inscrito
              </h1>
              <p style="margin:0 0 14px 0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:12px;color:#64748B;">
                Kárdex: <strong style="color:#0F172A;">${data.kardex || '.............................'}</strong>
              </p>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:0 24px 8px 24px;">
              <p style="margin:0 0 12px 0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#0F172A;">
                Estimado(a) Señor(a):
              </p>

              <p style="margin:0 0 14px 0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#0F172A;">
                Me es grato saludarlo(a) e informarle que el trámite realizado en
                <strong>NOTARÍA TAMBINI</strong>, bajo el Kárdex
                <strong>${data.kardex || '.............................'}</strong>, se encuentra <strong>INSCRITO</strong>.
              </p>

              <!-- Info box -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 14px 0;background:#F8FAFC;border:1px solid #E6EAF0;border-radius:10px;">
                <tr>
                  <td style="padding:12px 14px;">
                    <p style="margin:0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#0F172A;">
                    Asimismo, por el presente correo se adjunta INSCRIPCIÓN y RUC.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 16px 0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#0F172A;">
                No olvide recoger su testimonio dentro del horario de atención. En caso de requerir Testimonio digital.
              </p>

              <!-- CTA (botón bulletproof con VML para Outlook) -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="left" style="margin:0 0 18px 0;">
                <tr>
                  <td align="left">
           
                    <!--[if !mso]><!-- -->
                    <a href="https://wa.me/51977806351"
                       style="display:inline-block;text-decoration:none;background:#25D366;color:#FFFFFF;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;padding:10px 16px;border-radius:8px;">
                       Escribir por WhatsApp (977 806 351)
                    </a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>

              <div style="clear:both;"></div>

              <!-- Horario -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 16px 0;">
                <tr>
                  <td style="padding:12px 14px;border:1px solid #E6EAF0;border-radius:10px;">
                    <p style="margin:0 0 6px 0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:.3px;color:#0F172A;font-weight:700;">
                      Horario de atención
                    </p>
                    <p style="margin:0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;color:#0F172A;">
                      Lunes a viernes: 8:00 a. m. – 6:00 p. m. (horario corrido)<br />
                      Sábados: 9:00 a. m. – 12:00 p. m.
                    </p>
                  </td>
                </tr>
              </table>
              
<p style="margin:0 0 16px 0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#0F172A;"><strong>RECUERDE CERTIFICAR LA APERTURA DE SUS LIBROS CONTABLES Y SOCIETARIOS</strong> (ACTAS Y MATRÍCULA DE ACCIONES), contamos con una tarifa especial y podrá hacerlo valer en el área Extraprotocolar.</p>
              

              <p style="margin:0 0 12px 0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#0F172A;">
                Agradecemos la confianza depositada en nosotros y quedamos a su entera disposición para cualquier trámite notarial adicional.
              </p>

              <p style="margin:0 0 8px 0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#0F172A;">
                Atentamente,<strong> Notaría Tambini.</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F5F7FB;padding:14px 24px;text-align:center;">
              <p style="margin:0 6px 6px;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:12px;color:#64748B;">
                Este mensaje fue enviado automáticamente. Si recibió este correo por error, por favor ignórelo.
              </p>
              <p style="margin:0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:12px;color:#64748B;">
                Av. Jorge Basadre 280, San Isidro – Lima • <a href="https://www.notariatambini.com" style="color:#0F172A;text-decoration:underline;">notariatambini.com</a>
              </p>
            </td>
          </tr>
        </table>
        <!-- /Card -->
      </td>
    </tr>
  </table>
</body>
</html>

    `
  },

  // 6. Trámite liquidado
  6: {
    subject: 'COMUNICACIÓN POR TRÁMITE LIQUIDADO',
    html: (data) => `
      <!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Notaría Tambini – Trámite liquidado</title>
</head>
<body style="margin:0;padding:0;background:#F5F7FB;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#F5F7FB;">
    <tr>
      <td align="center" style="padding:24px 12px;">

        <!-- Card -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640"
               style="max-width:640px;background:#FFFFFF;border:1px solid #E6EAF0;border-radius:12px;overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:#0F4C81;padding:18px 24px;">
              <div style="font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:18px;font-weight:700;color:#FFFFFF;letter-spacing:.4px;">
                NOTARÍA TAMBINI
              </div>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:20px 24px 0 24px;">
              <h1 style="margin:0 0 8px 0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:20px;line-height:1.3;color:#0F172A;">
                Trámite liquidado
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:0 24px 8px 24px;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#0F172A;">

              <p style="margin:0 0 12px 0;">Estimado(a) Señor(a):</p>

              <p style="margin:0 0 12px 0;">
                Me es grato saludarlo(a) y mediante el presente informarle que el trámite realizado en 
                <strong>NOTARÍA TAMBINI</strong>, bajo el 
                <strong>${data.kardex || '……'}</strong> N.º 
                <strong>${data.numeroTitulo || '………….'}</strong>, se encuentra 
                <strong style="color:#15803D;">LIQUIDADO</strong>, siendo el monto del mayor derecho de 
                <strong>S/. ${data.monto || '0.00'}</strong>, por lo que ponemos a su disposición las cuentas de derechos registrales de NOTARÍA TAMBINI:
              </p>

              <!-- Resumen -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                     style="margin:0 0 16px 0;background:#F8FAFC;border:1px solid #E6EAF0;border-radius:8px;">
                <tr>
                  <td style="padding:12px 14px;">
                    <p style="margin:0 0 6px 0;font-size:13px;color:#64748B;">
                      Resumen de liquidación
                    </p>
                    <p style="margin:0;font-size:14px;color:#0F172A;">
                      Kárdex: <strong>${data.kardex || '……'}</strong> &nbsp;|&nbsp; Título N.º <strong>${data.numeroTitulo || '………….'}</strong><br/>
                      Mayor derecho: <strong>S/. ${data.monto || '0.00'}</strong>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Cuentas -->
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
                        <td style="padding:8px;border-bottom:1px solid #F1F5F9;color:#0F172A;">002 193 001151949046 17 </td>
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

              <!-- CTA WhatsApp -->
              <p style="margin:0 0 16px 0;">
                <a href="https://wa.me/51977806351"
                   style="display:inline-block;text-decoration:none;background:#25D366;color:#FFFFFF;font-size:14px;font-weight:600;padding:10px 16px;border-radius:8px;">
                   Enviar constancia por WhatsApp (977 806 351)
                </a>
              </p>

              <!-- Horario -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                     style="margin:0 0 16px 0;">
                <tr>
                  <td style="padding:12px 14px;border:1px solid #E6EAF0;border-radius:8px;background:#F8FAFC;">
                    <p style="margin:0 0 6px 0;font-size:13px;font-weight:700;color:#0F172A;">Horario de atención</p>
                    <p style="margin:0;font-size:13px;line-height:20px;color:#0F172A;">
                      Lunes a viernes: 8:00 a. m. – 6:00 p. m. (horario corrido)<br/>
                      Sábados: 9:00 a. m. – 12:00 p. m.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 6px 0;">Atentamente,</p>
              <p style="margin:0;font-weight:700;color:#0F4C81;">NOTARÍA TAMBINI</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F5F7FB;padding:14px 24px;text-align:center;">
              <p style="margin:0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;font-size:12px;color:#64748B;">
                Este mensaje fue enviado automáticamente. Si recibió este correo por error, por favor ignórelo.
              </p>
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>
</body>
</html>

    `
  },

  // 7. Trámite observado
  7: {
    subject: 'COMUNICACIÓN POR TRÁMITE OBSERVADO',
    html: (data) => `
      <!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Notaría Tambini – Trámite observado</title>
</head>
<body style="margin:0;padding:0;background:#F5F7FB;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#F5F7FB;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        
        <!-- Card -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640" 
               style="max-width:640px;background:#FFFFFF;border:1px solid #E6EAF0;border-radius:12px;overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:#0F4C81;padding:18px 24px;">
              <div style="font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;
                          font-size:18px;font-weight:700;color:#FFFFFF;letter-spacing:.4px;">
                NOTARÍA TAMBINI
              </div>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:20px 24px 0 24px;">
              <h1 style="margin:0 0 8px 0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;
                         font-size:20px;line-height:1.3;color:#0F172A;">
                Trámite observado
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:0 24px 8px 24px;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;
                       font-size:14px;line-height:22px;color:#0F172A;">

              <p style="margin:0 0 12px 0;">Estimado(a) Señor(a):</p>

              <p style="margin:0 0 12px 0;">
                Me es grato saludarlo(a) y mediante el presente informarle que el trámite realizado en 
                <strong>NOTARÍA TAMBINI</strong>, bajo el 
                <strong>N.º  ${data.kardex || '……'}</strong> 
               N.º , del cual se ha solicitado la inscripción registral ante <strong>SUNARP</strong>, con N.º de Título 
                <strong>${data.numeroTituloSunarp || '………'}</strong>, se encuentra 
                <strong style="color:#B45309;">OBSERVADO</strong>, por motivos señalados en la esquela adjunta.
              </p>

              <p style="margin:0 0 16px 0;">
                Le agradeceremos ponerse en contacto con el asesor legal que lo atendió, a fin de subsanar la observación registral.
              </p>

              <!-- CTA WhatsApp -->
              <p style="margin:0 0 16px 0;">
                <a href="https://wa.me/51977806351"
                   style="display:inline-block;text-decoration:none;background:#25D366;color:#FFFFFF;
                          font-size:14px;font-weight:600;padding:10px 16px;border-radius:8px;">
                   Contactar por WhatsApp (977 806 351)
                </a>
              </p>

              <!-- Horario -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 16px 0;">
                <tr>
                  <td style="padding:12px 14px;border:1px solid #E6EAF0;border-radius:8px;background:#F8FAFC;">
                    <p style="margin:0 0 6px 0;font-size:13px;font-weight:700;color:#0F172A;">Horario de atención</p>
                    <p style="margin:0;font-size:13px;line-height:20px;color:#0F172A;">
                      Lunes a viernes: 8:00 a. m. – 6:00 p. m. (horario corrido)<br/>
                      Sábados: 9:00 a. m. – 12:00 p. m.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 6px 0;">Atentamente,</p>
              <p style="margin:0;font-weight:700;color:#0F4C81;">NOTARÍA TAMBINI</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F5F7FB;padding:14px 24px;text-align:center;">
              <p style="margin:0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;
                        font-size:12px;color:#64748B;">
                Este mensaje fue enviado automáticamente. Si recibió este correo por error, por favor ignórelo.
              </p>
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>
</body>
</html>

    `
  },

  // 8. Trámite tachado
  8: {
    subject: 'COMUNICACIÓN POR TRÁMITE TACHADO',
    html: (data) => `
      <!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Notaría Tambini – Trámite tachado</title>
</head>
<body style="margin:0;padding:0;background:#F5F7FB;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#F5F7FB;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        
        <!-- Card -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640" 
               style="max-width:640px;background:#FFFFFF;border:1px solid #E6EAF0;border-radius:12px;overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:#0F4C81;padding:18px 24px;">
              <div style="font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;
                          font-size:18px;font-weight:700;color:#FFFFFF;letter-spacing:.4px;">
                NOTARÍA TAMBINI
              </div>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:20px 24px 0 24px;">
              <h1 style="margin:0 0 8px 0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;
                         font-size:20px;line-height:1.3;color:#0F172A;">
                Trámite tachado
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:0 24px 8px 24px;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;
                       font-size:14px;line-height:22px;color:#0F172A;">

              <p style="margin:0 0 12px 0;">Estimado(a) Señor(a):</p>

              <p style="margin:0 0 12px 0;">
                Me es grato saludarlo(a) y mediante el presente informarle que el trámite realizado en 
                <strong>NOTARÍA TAMBINI</strong>, bajo el 
                <strong>N.º  ${data.kardex || '……'}</strong> 
                del cual se ha solicitado la inscripción registral ante <strong>SUNARP</strong>, con N.º de Título 
                <strong>${data.numeroTituloSunarp || '……….'}</strong>, se encuentra 
                <strong style="color:#D9534F;">TACHADO</strong>, por motivos señalados en la esquela adjunta.
              </p>

              <p style="margin:0 0 12px 0;">
                En caso de cualquier consulta, le agradeceremos comunicarse con el asesor legal que atendió su trámite.
              </p>

              <!-- Horario -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" 
                     style="margin:0 0 16px 0;">
                <tr>
                  <td style="padding:12px 14px;border:1px solid #E6EAF0;border-radius:8px;background:#F8FAFC;">
                    <p style="margin:0 0 6px 0;font-size:13px;font-weight:700;color:#0F172A;">Horario de atención</p>
                    <p style="margin:0;font-size:13px;line-height:20px;color:#0F172A;">
                      Lunes a viernes: 8:00 a. m. – 6:00 p. m. (horario corrido)<br/>
                      Sábados: 9:00 a. m. – 12:00 p. m.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 12px 0;">
                Agradecemos la confianza depositada en nosotros y quedamos a su entera disposición para cualquier trámite notarial adicional.
              </p>

              <p style="margin:0 0 6px 0;">Atentamente,</p>
              <p style="margin:0;font-weight:700;color:#0F4C81;">NOTARÍA TAMBINI</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F5F7FB;padding:14px 24px;text-align:center;">
              <p style="margin:0;font-family:Segoe UI,Roboto,Arial,Helvetica,sans-serif;
                        font-size:12px;color:#64748B;">
                Este mensaje fue enviado automáticamente. Si recibió este correo por error, por favor ignórelo.
              </p>
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>
</body>
</html>

    `
  }
};

module.exports = rrppTemplates;
