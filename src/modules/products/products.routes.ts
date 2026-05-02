import { Router } from 'express';
import { getAllProducts, getProductById, createProduct, updateStock, updateProduct, deleteProduct, reactivateProduct } from './products.controller';
import { authenticate } from '../../middlewares/auth.middleware'; // <-- NUEVO


const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct, authenticate);
router.patch('/:id/stock', updateStock);
router.delete('/:id', deleteProduct, authenticate);
router.patch('/:id/reactivate', reactivateProduct, authenticate);
export default router;