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
router.get('/getDeployedContracts', adminController.getDeployedContracts);
router.post('/addAdminAddress', adminController.addAdminAddress);
router.get('/getAdminAddress', adminController.getAdminAddress);
router.delete('/deleteAdminAddress/:address', adminController.deleteAdminAddress);

// Error tracking


export default router; 