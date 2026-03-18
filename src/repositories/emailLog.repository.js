/**
 * Repository Pattern — EmailLogRp
 * Centraliza toda la interacción con la tabla email_log_rp.
 * Los servicios y controllers no conocen Sequelize directamente.
 */
const EmailLogRp = require('../models/EmailLogRp');
const { Op }     = require('sequelize');

/**
 * Guarda un registro de log. Nunca lanza, retorna { saved, error }.
 * @param {object} payload
 * @returns {Promise<{ saved: boolean, error: string|null }>}
 */
async function trySave(payload) {
  try {
    await EmailLogRp.create(payload);
    return { saved: true, error: null };
  } catch (error) {
    console.error('EmailLogRepository.trySave — no se pudo guardar el log:', error.message);
    return { saved: false, error: error.message };
  }
}

/**
 * Retorna todos los registros ordenados por fecha de creación descendente.
 * @returns {Promise<Array>}
 */
async function findAll() {
  return EmailLogRp.findAll({ order: [['fechaCreacion', 'DESC']] });
}

/**
 * Retorna registros filtrados por los campos opcionales proporcionados.
 * @param {{ destinatario?: string, estado?: string, desde?: string, hasta?: string }} filters
 * @returns {Promise<Array>}
 */
async function findWithFilters({ destinatario, estado, desde, hasta } = {}) {
  const where = {};

  if (destinatario) where.destinatario = destinatario;
  if (estado)       where.estado       = estado;

  if (desde && hasta) {
    where.fechaCreacion = {
      [Op.between]: [
        new Date(`${desde}T00:00:00-05:00`),
        new Date(`${hasta}T23:59:59-05:00`),
      ],
    };
  }

  return EmailLogRp.findAll({ where, order: [['fechaCreacion', 'DESC']] });
}

module.exports = { trySave, findAll, findWithFilters };
