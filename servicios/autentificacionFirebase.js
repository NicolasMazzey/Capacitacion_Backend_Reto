const admin = require('./firebase.js');

const verificarAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) return res.status(401).send("Token requerido");

  try {
    const decoded = await admin.auth().verifyIdToken(token);

    if (decoded.rol !== "admin") {
      return res.status(403).send("Acceso denegado: no sos admin");
    }

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send("Token inválido");
  }
};


module.exports = { verificarAdmin };