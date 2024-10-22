const express = require("express");
const { Sequelize } = require("sequelize");
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors());

//Conexion a la base de datos
const sequelize = new Sequelize('agricola', 'siag', 'desa', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres'
});

// Rutas de ejemplo
app.get("/", (req, res) => {
    res.send("¡Backend funcionando!");
  });

  // Puerto en el que el servidor estará escuchando
const PORT = process.env.PORT || 2999;
app.listen(PORT, async () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Conexión con la base de datos exitosa.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
});