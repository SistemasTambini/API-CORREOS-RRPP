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
      <p>Estimado(a) Señor(a):</p>
      <p>Me es grato saludarlo(a), y mediante el presente informarle que el trámite realizado en <strong>NOTARÍA TAMBINI</strong>, bajo el ${data.kardex || '.............................'} N° ${data.numeroTitulo || '.............................'}, se encuentra <strong>INSCRITO</strong>.</p>
      <p>Asimismo tiene un monto por devolverse de la SUNARP, la suma de S/${data.montoDevolucion || '0.00'}. No olvidar que la devolución es de 30 días calendario, contados desde la solicitud correspondiente.</p>
      <p>No olvide recoger su testimonio dentro del horario de atención. Contamos con el Servicio de entrega de documentos a domicilio con tarifa especial, escríbanos al WhatsApp 977806351.</p>
      <p>Lunes a viernes de: 8:00 a.m. a 6:00 p.m. (Horario corrido) - Sábados de: 9:00 a.m. a 12:00 p.m.</p>
      <p>Agradecemos la confianza depositada en nosotros y quedamos a su entera disposición para cualquier trámite notarial adicional.</p>
      <p>Atentamente,</p>
    `
  },

  // 3. Trámite inscrito
  3: {
    subject: 'COMUNICACIÓN POR TRÁMITE INSCRITO',
    html: (data) => `
      <p>Estimado(a) Señor(a):</p>
      <p>Me es grato saludarlo(a), y mediante el presente informarle que el trámite realizado en <strong>NOTARÍA TAMBINI</strong>, bajo el ${data.kardex || '.............................'} N° ${data.numeroTitulo || '...........................................'}, se encuentra <strong>INSCRITO</strong>.</p>
      <p>No olvide recoger su testimonio dentro del horario de atención. Contamos con el Servicio de entrega de documentos a domicilio con tarifa especial, escríbanos al WhatsApp 977806351.</p>
      <p>Horario de Atención: Lunes a viernes de: 8:00 a.m. a 6:00 p.m. (Horario corrido) - sábados de: 9:00 a.m. a 12:00 p.m.</p>
      <p>Agradecemos la confianza depositada en nosotros y quedamos a su entera disposición para cualquier trámite notarial adicional.</p>
      <p>Atentamente,</p>
    `
  },

  // 4. Trámite inscrito con devolución (constitución empresa)
  4: {
    subject: 'COMUNICACIÓN POR TRÁMITE INSCRITO CON DEVOLUCIÓN (CONSTITUCIÓN DE EMPRESA)',
    html: (data) => `
      <p>Estimado(a) Señor(a):</p>
      <p>Me es grato saludarlo(a), y mediante el presente informarle que el trámite realizado en <strong>NOTARÍA TAMBINI</strong>, bajo el kardex N° ${data.kardex || '...............'}, se encuentra <strong>INSCRITO</strong>.</p>
      <p>Por el presente correo se adjunta INSCRIPCIÓN y RUC.</p>
      <p>Tiene un monto por devolverse de la SUNARP, la suma de S/ ${data.montoDevolucion || '0.00'}. No olvidar que la devolución es de 30 días calendario, contados desde la solicitud correspondiente.</p>
      <p>No olvide recoger su testimonio dentro del horario de atención. En caso de requerir Testimonio digital, comunicarse al WhatsApp 977806351.</p>
      <p>Nuestro horario de atención es de: Lunes a viernes de: 8:00 a.m. a 6:00 p.m. (Horario corrido) - sábados de: 9:00 a.m. a 12:00 p.m.</p>
      <p><strong>RECUERDE CERTIFICAR LA APERTURA DE SUS LIBROS CONTABLES Y SOCIETARIOS</strong> (ACTAS Y MATRÍCULA DE ACCIONES), contamos con una tarifa especial y podrá hacerlo valer en el área Extra protocolar.</p>
      <p>Agradecemos la confianza depositada en nosotros y quedamos a su entera disposición para cualquier trámite notarial adicional.</p>
      <p>Atentamente,</p>
    `
  },

  // 5. Trámite inscrito (constitución empresa)
  5: {
    subject: 'COMUNICACIÓN POR TRÁMITE INSCRITO (CONSTITUCIÓN DE EMPRESA)',
    html: (data) => `
      <p>Estimado(a) Señor(a):</p>
      <p>Me es grato saludarlo(a), y mediante el presente informarle que el trámite realizado en <strong>NOTARÍA TAMBINI</strong>, bajo el kardex N° ${data.kardex || '..............'}, se encuentra <strong>INSCRITO</strong>.</p>
      <p>Por el presente correo se adjunta INSCRIPCIÓN y RUC.</p>
      <p>No olvide recoger su testimonio dentro del horario de atención. En caso de requerir Testimonio digital, comunicarse al WhatsApp 977806351.</p>
      <p><strong>RECUERDE CERTIFICAR LA APERTURA DE SUS LIBROS CONTABLES Y SOCIETARIOS</strong> (ACTAS Y MATRÍCULA DE ACCIONES), contamos con una tarifa especial y podrá hacerlo valer en el área Extra protocolar.</p>
      <p>Nuestro horario de atención es de: Lunes a viernes de: 8:00 a.m. a 6:00 p.m. (Horario corrido) - sábados de: 9:00 a.m. a 12:00 p.m.</p>
      <p>Agradecemos la confianza depositada en nosotros y quedamos a su entera disposición para cualquier trámite notarial adicional.</p>
      <p>Atentamente,</p>
    `
  },

  // 6. Trámite liquidado
  6: {
    subject: 'COMUNICACIÓN POR TRÁMITE LIQUIDADO',
    html: (data) => `
      <p>Estimado(a) Señor(a):</p>
      <p>Me es grato saludarlo(a) y mediante el presente informarle que el trámite realizado en <strong>NOTARÍA TAMBINI</strong>, bajo el ${data.kardex || '……'} N° ${data.numeroTitulo || '………….'}, se encuentra <strong>LIQUIDADO</strong>, siendo el monto del mayor derecho de S/. ${data.monto || '0.00'}, por lo que ponemos a su disposición las cuentas de derechos registrales de NOTARÍA TAMBINI:</p>
      <p>Le agradeceremos enviar la constancia del depósito indicando la fecha y hora, y comunicarse con el asesor legal que atendió su trámite.</p>
      <p>Nuestro horario de atención es de: Lunes a viernes de: 8:00 a.m. a 6:00 p.m. (Horario corrido) - sábados de: 9:00 a.m. a 12:00 p.m.</p>
      <p>Atentamente,</p>
    `
  },

  // 7. Trámite observado
  7: {
    subject: 'COMUNICACIÓN POR TRÁMITE OBSERVADO',
    html: (data) => `
      <p>Estimado(a) Señor(a):</p>
      <p>Me es grato saludarlo(a) y mediante el presente informarle que el trámite realizado en <strong>NOTARÍA TAMBINI</strong>, bajo el ${data.kardex || '……'} N° ${data.numeroTitulo || '…………...'}, del cual se ha solicitado la inscripción registral ante SUNARP, con N° de Título ${data.numeroTituloSunarp || '………'}, se encuentra <strong>OBSERVADO</strong>, por motivos señalados en la esquela adjunta.</p>
      <p>Le agradeceremos ponerse en contacto con el asesor legal que lo atendió, a fin de subsanar la observación registral.</p>
      <p>Nuestro horario de atención es de Lunes a Viernes de 8:00 a.m. a 6:00 p.m. (horario corrido) y los Sábados de 9:00 a.m. a 12:00 p.m.</p>
      <p>Atentamente,</p>
    `
  },

  // 8. Trámite tachado
  8: {
    subject: 'COMUNICACIÓN POR TRÁMITE TACHADO',
    html: (data) => `
      <p>Estimado(a) Señor(a):</p>
      <p>Me es grato saludarlo(a) y mediante el presente informarle que el trámite realizado en <strong>NOTARÍA TAMBINI</strong>, bajo el ${data.kardex || '……'} N° ${data.numeroTitulo || '……………'}, del cual se ha solicitado la inscripción registral ante SUNARP, con N° de Título ${data.numeroTituloSunarp || '……….'}, se encuentra <strong>TACHADO</strong>, por motivos señalados en la esquela adjunta.</p>
      <p>En caso de cualquier consulta, le agradeceremos comunicarse con el asesor legal que atendió su trámite.</p>
      <p>Nuestro horario de atención es de Lunes a Viernes de 8:00 a.m. a 6:00 p.m. (horario corrido) y los Sábados de 9:00 a.m. a 12:00 p.m.</p>
      <p>Agradecemos la confianza depositada en nosotros y quedamos a su entera disposición para cualquier trámite notarial adicional.</p>
      <p>Atentamente,</p>
    `
  }
};

module.exports = rrppTemplates;
