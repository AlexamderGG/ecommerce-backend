import { Response, NextFunction, Request } from 'express';
import { verifyToken } from '../config/jwt';

// Extendemos el tipo Request de Express para saber que existe un 'user'
export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extrae el "Bearer <token>"
  
  if (!token) {
    res.status(401).json({ message: 'No has iniciado sesión' });
    return;
  }

  try {
    const decoded = verifyToken(token); // Decodifica el JWT
    //console.log("🔑 TOKEN DECODIFICADO:", decoded);
    req.user = decoded; // Guarda el userId y roleId en la petición
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};