const express = require('express');
const cors = require('cors');
const emailRoutes = require('./routes/email.routes');

const app = express();

// Cargar middlewares
app.use(cors()); // Habilita CORS
app.use(express.json());

// Rutas
app.use('/api/email', emailRoutes);

module.exports = app;
