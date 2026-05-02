import { Request, Response } from 'express';
import { getCartFromDBService, syncCartToDBService } from './cart.service';
import { authenticate, AuthRequest } from '../../middlewares/auth.middleware';

export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).user.id;
    const items = await getCartFromDBService(userId);
    res.json(items);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const syncCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).user.id;
    const { items } = req.body;
    await syncCartToDBService(userId, items);
    res.json({ message: 'Carrito sincronizado' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};