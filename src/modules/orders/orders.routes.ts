import { Router } from 'express';
import { createOrder, getOrders } from './orders.controller';
import { authenticate } from '../../middlewares/auth.middleware'; // <-- NUEVO

const router = Router();

// Rutas protegidas: SI O SI necesita un token válido
router.get('/', authenticate, getOrders);
router.post('/checkout', authenticate, createOrder);

export default router;