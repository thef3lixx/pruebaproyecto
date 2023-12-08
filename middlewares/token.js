const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  // Obtener el token directamente del encabezado de la solicitud
  const token = req.headers['authorization'];

  // Verifica que el token comience con "Bearer"
  if (!token || !token.startsWith('Bearer ')) {
    console.log('Token no proporcionado.');
    return res.status(401).json({ mensaje: 'Acceso denegado. Identifíquese.' });
  }


  // Extrae el token sin el prefijo "Bearer "
  const tokenWithoutBearer = token.slice(7);


  try {
    const usuarioVerificado = jwt.verify(tokenWithoutBearer, process.env.TOKEN_SECRET);
    req.usuario = usuarioVerificado;
    next();
  } catch (error) {
     console.error('Error al verificar el token:', error.message);
    res.status(400).json({ mensaje: 'Token no válido o expirado.' });
  }


};


module.exports = verificarToken;