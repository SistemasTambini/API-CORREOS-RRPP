require('dotenv').config();

// Valida variables de entorno antes de arrancar el servidor
const { validateEnv } = require('./src/config/env');
validateEnv();

const app  = require('./src/app');
const PORT = process.env.PORT || 3015;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});