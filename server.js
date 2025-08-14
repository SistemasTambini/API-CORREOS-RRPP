require('dotenv').config(); // Cargar variables de entorno
const app = require('./src/app');

const PORT = process.env.PORT || 3015;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});