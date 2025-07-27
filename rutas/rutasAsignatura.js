const express = require('express');
const router = express.Router();

const Usuario = require('../modelos/usuario');
const Asignatura = require('../modelos/asignatura');
const Inscripcion = require('../modelos/Inscripcion');

// Crear una nueva asignatura
router.post('/', async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    const asignatura = await Asignatura.create({ nombre, descripcion });
    res.status(201).json(asignatura);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear asignatura' });
  }
});

// Obtener todas las asignaturas
router.get('/', async (req, res) => {
  try {
    const asignaturas = await Asignatura.findAll();
    res.json(asignaturas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener asignaturas' });
  }
});

// Obtener todos los usuarios de una asignatura
router.get('/:idAsignatura', async (req, res) => {
  const { idAsignatura } = req.params;
  try {
    const asignatura = await Asignatura.findByPk(idAsignatura, {
      include: Usuario
    });

    if (!asignatura) {
      return res.status(404).json({ error: 'asignatura no encontrada' });
    }
    
    res.json(asignatura.Usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios de la asignatura' });
  }
});

// Inscribir un usuario a una asignatura
router.post('/inscribir/:idAsignatura/:idUsuario', async (req, res) => {
  const { idAsignatura, idUsuario } = req.params;

  try {
    const usuario = await Usuario.findByPk(idUsuario);
    const asignatura = await Asignatura.findByPk(idAsignatura);

    if (!usuario || !asignatura) {
      return res.status(404).json({ error: 'Usuario o asignatura no encontrados' });
    }

    await usuario.addAsignatura(asignatura);
    res.json({ mensaje: 'Usuario inscrito correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al inscribir usuario' });
  }
});

// Obtener asignaturas de un usuario
router.get('/usuario/:idUsuario', async (req, res) => {
  const { idUsuario } = req.params;

  try {
    const usuario = await Usuario.findByPk(idUsuario, {
      include: Asignatura
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(usuario.Asignaturas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener asignaturas del usuario' });
  }
});

// Eliminar inscripción de usuario a asignatura
router.delete('/borrar/:idAsignatura/:idUsuario', async (req, res) => {
  const { idAsignatura, idUsuario } = req.params;

  try {
    const result = await Inscripcion.destroy({
      where: {
        UsuarioId: idUsuario,
        AsignaturaId: idAsignatura
      }
    });

    if (result === 0) {
      return res.status(404).json({ error: 'Inscripción no encontrada' });
    }

    res.json({ mensaje: 'Inscripción eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar inscripción' });
  }
});

module.exports = router;
