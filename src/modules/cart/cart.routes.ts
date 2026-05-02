import { Router } from 'express';
import { getCart, syncCart } from './cart.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();
router.get('/', authenticate, getCart);
router.post('/sync', authenticate, syncCart);

export default router;