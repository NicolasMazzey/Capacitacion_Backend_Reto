const express = require('express');
const router = express.Router();
const Usuario = require('../modelos/usuario');
const { verificarAdmin } = require('../servicios/autentificacionFirebase.js');
const admin = require("firebase-admin");


// Listar usuarios
router.get('/', async (req, res) => {                   
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ['contrasena'] }
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar usuarios' });
  }
});

// Editar usuario
router.put('/:id', async (req, res) => {    
  const { id } = req.params;
  const { nombre } = req.body;

  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    usuario.nombre = nombre ?? usuario.nombre;

    await usuario.save();
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al editar usuario' });
  }
});

// Eliminación de usuario
router.delete('/:id', verificarAdmin, async (req, res) => {    
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    console.log(usuario.correo)
    try {
      const userRecord = await admin.auth().getUserByEmail(usuario.correo);
      console.log('Usuario encontrado:');
      await admin.auth().deleteUser(userRecord.uid); //Delete en Firebase
      console.log("usuario eliminado en Firebase")
    } catch (error) {
      console.error('No se encontró el usuario o hubo un error:', error.message);
    }

    await usuario.destroy(); //Delete en sqlite

    res.json({ mensaje: 'Usuario eliminado permanentemente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

module.exports = router;
