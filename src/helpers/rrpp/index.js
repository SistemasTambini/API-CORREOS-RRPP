/**
 * Índice de plantillas RRPP.
 * Mantiene el mismo contrato que el archivo original rrpp.template.js:
 *   rrppTemplates[caseId].subject(data)  → string
 *   rrppTemplates[caseId].html(data)     → string HTML
 *
 * Para agregar un nuevo case: crear caseN.template.js y registrarlo aquí.
 */
const rrppTemplates = {
  1:  require('./templates/case1.template'),
  2:  require('./templates/case2.template'),
  3:  require('./templates/case3.template'),
  4:  require('./templates/case4.template'),
  5:  require('./templates/case5.template'),
  6:  require('./templates/case6.template'),
  7:  require('./templates/case7.template'),
  8:  require('./templates/case8.template'),
  9:  require('./templates/case9.template'),
  10: require('./templates/case10.template'),
};

module.exports = rrppTemplates;
