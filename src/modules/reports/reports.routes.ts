import { Router } from 'express';
import { getDashboard, downloadOperationalReport, downloadManagementReport } from './reports.controller';
import { authenticate } from '../../middlewares/auth.middleware'; // <-- NUEVO


const router = Router();
router.get('/dashboard', getDashboard, authenticate);
router.get('/pdf/operational', authenticate, downloadOperationalReport); // <--- NUEVA
router.get('/pdf/management', authenticate, downloadManagementReport);     // <--- NUEVA

export default router;