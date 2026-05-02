import { Request, Response } from 'express';
import { getWishlistService, toggleWishlistService } from './wishlist.service';
import { authenticate, AuthRequest } from '../../middlewares/auth.middleware';

export const getWishlist = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).user.id;
    const wishlist = await getWishlistService(userId);
    // Formateamos para que el frontend solo reciba un array de productos
    const products = wishlist.map(item => item.product);
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleWishlist = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).user.id;
    const productId = req.params.productId as string;
    const result = await toggleWishlistService(userId, productId);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};