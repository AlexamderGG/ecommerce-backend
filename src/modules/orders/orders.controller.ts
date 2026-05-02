import { Request, Response } from 'express';
import { createOrderService, getOrdersByUserService } from './orders.service';
import { authenticate, AuthRequest } from '../../middlewares/auth.middleware'; // <-- NUEVO

export const createOrder = async (req: Request, res: Response) => {
  try {
    // ¡Mágia! El middleware inyectó el usuario real en req.user
    const userId = (req as AuthRequest).user.id; 
    
    const { items, shippingCost } = req.body;
    if (!items || items.length === 0) {
       res.status(400).json({ message: 'El carrito está vacío' });
       return;
    }
    // Enviamos el userId real que viene del token
    const order = await createOrderService({ userId, items, shippingCost }); 
    res.status(201).json(order);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).user.id; 
    const orders = await getOrdersByUserService(userId);
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};