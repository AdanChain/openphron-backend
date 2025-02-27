import express from 'express';
import adminController from '../controllers/adminController';

const router = express.Router();

// System stats and monitoring
router.get('/getUserInfo', adminController.getUserInfo);
router.get('/getUserState', adminController.getUserState);
router.get('/updateContracts', adminController.updateContracts);
router.post('/addUser', adminController.addUser);
router.delete('/deleteUser/:address', adminController.deleteUser);
router.delete('/deleteError', adminController.deleteError);
router.get('/sharedContracts', adminController.getSharedContracts);
router.get('/getApiKeys', adminController.getApiKeys);

// Error tracking


export default router; 