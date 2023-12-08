const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const User = require('../models/usuarios');
require('dotenv').config();


// Endpoint de inicio de sesión
router.post('/auth', async (req, res) => {
  const { email, pass } = req.body;

  try {
    // Buscar al usuario en la base de datos por correo electrónico y contraseña
    const usuarioEncontrado = await User.findOne({ email, pass });

    if (!usuarioEncontrado) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    // Generar token JWT utilizando el secreto cargado desde .env
    const token = jwt.sign({ id: usuarioEncontrado._id, email: usuarioEncontrado.email }, process.env.TOKEN_SECRET, { expiresIn: '3m' });

    // Almacenar el token en el encabezado de la respuesta (res)
    res.header('Authorization', `Bearer ${token}`).json({ mensaje: 'Inicio de sesión exitoso', token });


  } catch (error) {
    res.status(500).json({ mensaje: 'Error en la autenticación' });
  }
});

module.exports = router;