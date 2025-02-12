import express from "express";
import {
  oracleController,
  questionController,
  subscriptionController,
} from "../AImarketplace/controllers";
import { contractController, workflowContoller } from "../contract/controllers";
import { verifySignatureMiddleware } from "../middleware";
import costController from "../contract/controllers/cost";
const routers = express.Router();

///////////Contract Routers///////////////
routers.get(
  "/contract",
  verifySignatureMiddleware,
  contractController.getContracts
);
routers.post(
  "/contract",
  verifySignatureMiddleware,
  contractController.sendInitMessage
);
routers.post(
  "/contract/message",
  verifySignatureMiddleware,
  contractController.sendMessage
);
routers.post(
  "/contract/deployed",
  verifySignatureMiddleware,
  contractController.addDeployedContracts
);
routers.delete(
  "/contract/:_id",
  verifySignatureMiddleware,
  contractController.deleteContract
);

routers.post(
  "/contract/save-result",
  verifySignatureMiddleware,
  contractController.saveResult
);

routers.get("/contract/deployed", contractController.getDeployedContracts);

routers.get(
  "/contract/user/deployed/:id",
  verifySignatureMiddleware,
  contractController.getUserDeployedContracts
);

routers.get(
  "/workflow",
  verifySignatureMiddleware,
  workflowContoller.getWorkflows
);
routers.get(
  "/workflow/:id",
  verifySignatureMiddleware,
  workflowContoller.getWorkflowById
);

routers.post(
  "/token/reduce",
  verifySignatureMiddleware,
  costController.reduceTokens
);
routers.get("/token", verifySignatureMiddleware, costController.getTokens);
routers.post(
  "/token/subscribe",
  verifySignatureMiddleware,
  costController.subscribeTokens
);

//////////////Oracle Routers/////////////

routers.get("/oracle", verifySignatureMiddleware, oracleController.gets);
routers.get("/oracle/:id", verifySignatureMiddleware, oracleController.getById);

routers.get("/question", verifySignatureMiddleware, questionController.gets);
routers.get(
  "/question/:id",
  verifySignatureMiddleware,
  questionController.getById
);
routers.get(
  "/question/oracle/:oracleId",
  verifySignatureMiddleware,
  questionController.questionsForOracle
);

routers.get(
  "/subscription/user",
  verifySignatureMiddleware,
  subscriptionController.getByUser
);
routers.get(
  "/subscription/oracle/:oracleId",
  verifySignatureMiddleware,
  subscriptionController.getsByOracle
);

export default routers;
