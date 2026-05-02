import { Router } from 'express';
import { getWishlist, toggleWishlist } from './wishlist.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();
router.get('/', authenticate, getWishlist);
router.post('/:productId', authenticate, toggleWishlist); // POST para añadir/eliminar (Toggle)

export default router;