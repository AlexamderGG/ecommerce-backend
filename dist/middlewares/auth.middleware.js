"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jwt_1 = require("../config/jwt");
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extrae el "Bearer <token>"
    if (!token) {
        res.status(401).json({ message: 'No has iniciado sesión' });
        return;
    }
    try {
        const decoded = (0, jwt_1.verifyToken)(token); // Decodifica el JWT
        //console.log("🔑 TOKEN DECODIFICADO:", decoded);
        req.user = decoded; // Guarda el userId y roleId en la petición
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Token inválido o expirado' });
    }
};
exports.authenticate = authenticate;
