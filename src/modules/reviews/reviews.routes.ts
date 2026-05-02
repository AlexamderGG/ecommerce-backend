import { Router } from 'express';
import { getReviews, createReview } from './reviews.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();
// Público: Todos pueden ver las reseñas
router.get('/:productId', getReviews); 
// Privado: Solo logueados pueden crear
router.post('/:productId', authenticate, createReview); 

export default router;