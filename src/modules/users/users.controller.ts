import { Request, Response } from 'express';
import { getUserProfileService, updateAddressService } from './users.service';
import { authenticate, AuthRequest } from '../../middlewares/auth.middleware';

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).user.id;
    const user = await getUserProfileService(userId);
    res.json(user);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const updateAddress = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).user.id;
    const { address } = req.body;
    
    if (!address || address.trim() === '') {
       res.status(400).json({ message: 'La dirección no puede estar vacía' });
       return;
    }
    
    const user = await updateAddressService(userId, address);
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};