import { Router } from 'express';
import { getProfile, updateAddress } from './users.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();
router.get('/profile', authenticate, getProfile);
router.put('/address', authenticate, updateAddress);

export default router;