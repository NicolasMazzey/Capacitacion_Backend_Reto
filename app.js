const express = require('express');
const app = express();
const PORT = 3000;

const sequelize = require('./servicios/sql');
const usuarioRoutes = require('./rutas/rutasUsuario');
const authRouter = require('./rutas/rutasAutentificacion');
const asignaturaRoutes = require('./rutas/rutasAsignatura');

app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/auth', authRouter);
app.use('/api/asignatura', asignaturaRoutes);


sequelize.sync().then(() => {
  console.log('Base de datos anda');
  app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});