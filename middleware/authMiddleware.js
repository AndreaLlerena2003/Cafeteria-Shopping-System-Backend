const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const verificarToken = (req, res, next) => {
    const token = req.header('Authorization'); // Leemos el header

    if (!token) {
        return res.status(401).send('Acceso no autorizado: Token no proporcionado');
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET); // Bearer --> indica el token se envia por http
        req.userId = decoded.userId; // Decodeamos el user id
        next(); // Con next le decimos a express que hemos terminado y que debemos pasar a otro middwlare o al controlador final
    } catch (error) {
        console.error(error);
        return res.status(401).send('Acceso no autorizado: Token inválido');
    }
};

module.exports = verificarToken;
