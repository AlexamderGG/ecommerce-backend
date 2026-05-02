import { Request, Response } from 'express';
import { loginService } from './auth.service';
import { registerService } from './auth.service';

export const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
       res.status(400).json({ message: 'Email y contraseña son requeridos' });
       return;
    }

    const result = await loginService(email, password);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({ message: error.message || 'Error al iniciar sesión' });
  }
};

export const registerController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
       res.status(400).json({ message: 'Nombre, email y contraseña son requeridos' });
       return;
    }
    const result = await registerService(name, email, password);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};