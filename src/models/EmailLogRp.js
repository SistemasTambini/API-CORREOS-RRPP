// models/EmailLogRp.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const EmailLogRp = sequelize.define('EmailLogRp', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  destinatario: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  cc: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  bcc: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  asunto: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  caseId: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  estado: {
    type: DataTypes.ENUM('SENT', 'FAILED'),
    allowNull: false
  },
  errorMensaje: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  messageId: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  cuenta: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'email_log_rp',
  timestamps: true,
  createdAt: 'fechaCreacion',
  updatedAt: 'fechaActualizacion'
});

module.exports = EmailLogRp;
