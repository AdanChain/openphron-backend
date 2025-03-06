import express from "express";
import {
  oracleController,
  questionController,
  subscriptionController,
} from "../AImarketplace/controllers";
import { contractController, workflowContoller } from "../contract/controllers";
import { verifyAdmin, verifySignatureMiddleware } from "../middleware";
import costController from "../contract/controllers/cost";
import adminRoutes from '../admin/routes';
import { apiKeyController } from "../api/controller";
const routers = express.Router();

///////////Contract Routers///////////////
routers.get("/contract", verifySignatureMiddleware, contractController.getContracts);
routers.post("/contract", verifySignatureMiddleware, contractController.sendInitMessage);
routers.post("/contract/message", verifySignatureMiddleware, contractController.sendMessage);
routers.delete("/contract/:_id", verifySignatureMiddleware, contractController.deleteContract)
routers.post("/contract/share", contractController.shareContract);
routers.get("/contract/shared/:access_token", contractController.getSharedContract);
routers.post("/contract/rename", contractController.renameContract);
routers.post("/contract/shared", contractController.addSharedContract);

routers.post("/contract/save-result", verifySignatureMiddleware, contractController.saveResult);

routers.post("/contract/deployed", verifySignatureMiddleware, contractController.addDeployedContracts);
routers.get("/contract/deployed", contractController.getDeployedContracts);

routers.get("/contract/user/deployed/:id", verifySignatureMiddleware, contractController.getUserDeployedContracts);

routers.get("/workflow", verifySignatureMiddleware, workflowContoller.getWorkflows);
routers.get("/workflow/:id", verifySignatureMiddleware, workflowContoller.getWorkflowById);

routers.post("/token/reduce", verifySignatureMiddleware, costController.reduceTokens);
routers.get("/token", verifySignatureMiddleware, costController.getTokens);
routers.post("/token/subscribe", verifySignatureMiddleware, costController.subscribeTokens)

routers.post("/contract/save-error", verifySignatureMiddleware, contractController.saveError);

//////////////Oracle Routers/////////////

routers.post("/oracle", verifySignatureMiddleware, oracleController.create);
routers.get("/oracle", verifySignatureMiddleware, oracleController.gets);
routers.get("/oracle/:id", verifySignatureMiddleware, oracleController.getById);
routers.post("/oracle/rename", verifySignatureMiddleware, oracleController.rename);
routers.delete("/oracle/:id", verifySignatureMiddleware, oracleController.delete);

routers.post("/question", verifySignatureMiddleware, questionController.create)
routers.get("/question", verifySignatureMiddleware, questionController.gets)
routers.get("/question/:id", verifySignatureMiddleware, questionController.getById)
routers.get("/question/oracle/:oracleId", verifySignatureMiddleware, questionController.questionsForOracle)
routers.post("/question/update", verifySignatureMiddleware, questionController.update)

routers.post("/subscribe", verifySignatureMiddleware, subscriptionController.subscribe);
routers.get("/subscription/user", verifySignatureMiddleware, subscriptionController.getByUser);
routers.get("/subscription/oracle/:oracleId", verifySignatureMiddleware, subscriptionController.getsByOracle);

// Add admin routes
routers.use('/admin',verifySignatureMiddleware, verifyAdmin,adminRoutes);

///////////API Routers///////////////
routers.post('/key', verifySignatureMiddleware, apiKeyController.createApiKey);
routers.get('/key', verifySignatureMiddleware, apiKeyController.getApiKeys);
routers.delete('/key/:apiKey', verifySignatureMiddleware, apiKeyController.deleteApiKey);

export default routers;
