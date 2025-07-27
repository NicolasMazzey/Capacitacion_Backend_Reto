const express = require('express');
const router = express.Router();
const Usuario = require('../modelos/usuario');
const admin = require("firebase-admin");
const axios = require("axios");


const API_KEY = "AIzaSyCoDm0tn00DUQ6SZahpFC_ceLtRqHngtq4";


router.post("/registrar", async (req, res) => {         
  const { correo, contrasena, rol, nombre  } = req.body;
  try {

    if (!nombre) {
      return res.status(401).json({ error: 'nombre vacio' });
    }

    if (!correo) {
      return res.status(401).json({ error: 'correo invalido' });
    }

    if (!contrasena && contrasena.length < 6) {
      return res.status(401).json({ error: 'falta contraseña de largo mayor a 6 caracteres' });
    }

    if (rol != "usuario" && rol != "admin") {
      return res.status(401).json({ error: 'rol inválido, (usuario o admin)' });
    }

    const user = await admin.auth().createUser({ email:correo, password:contrasena });
    await admin.auth().setCustomUserClaims(user.uid, { rol: rol });

    const nuevoUsuario = await Usuario.create({
      correo,
      contrasena,
      rol,
      nombre,
    });

    res.status(201).json({ uid: user.uid, mensaje: "usuario creado en Firebase y sqlite", nuevoUsuario });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {      
  const { correo, contrasena } = req.body;
  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        email: correo,
        password: contrasena,
        returnSecureToken: true,
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    res.json({ idToken: response.data.idToken });
  } catch (err) {
    res.status(401).json({ error: "Credenciales inválidas" });
  }
});

module.exports = router;
