import express from 'express';
import adminController from '../controllers/adminController';
import { verifyAdmin } from '../../middleware';

const router = express.Router();

// System stats and monitoring
router.get('/stats', verifyAdmin, adminController.getSystemStats);
router.get('/usage', verifyAdmin, adminController.getUserUsageData);
router.get('/error-stats', verifyAdmin, adminController.getErrorStats);

// Error tracking
router.get('/compile-errors', verifyAdmin, adminController.getCompileErrors);
router.get('/test-errors', verifyAdmin, adminController.getTestErrors);

// User management
router.post('/user/suspend', verifyAdmin, adminController.suspendUser);
router.post('/user/extend', verifyAdmin, adminController.extendUserSubscription);
router.post('/user/tokens/add', verifyAdmin, adminController.addUserTokens);

export default router; 