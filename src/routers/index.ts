import express from "express";
import { oracleController, questionController, subscriptionController } from "../AImarketplace/controllers";
import { contractController, workflowContoller } from "../contract/controllers";
const routers = express.Router();


///////////Contract Routers///////////////
routers.get("/contract/:userAddress", contractController.getContracts);
routers.post("/contract", contractController.sendInitMessage);
routers.post("/contract/message", contractController.sendMessage);
routers.delete("/contract/:_id", contractController.deleteContract)

routers.post("/contract/save-result", contractController.saveResult);

routers.get("/workflow", workflowContoller.getWorkflows);
routers.get("/workflow/:id", workflowContoller.getWorkflowById);




//////////////Oracle Routers/////////////

routers.get("/oracle", oracleController.gets)
routers.get("/oracle/:id", oracleController.getById)

routers.get("/question", questionController.gets)
routers.get("/question/:id", questionController.getById)
routers.get("/question/oracle/:oracleId", questionController.questionsForOracle)

routers.get("/subscription/user/:userAddress", subscriptionController.getByUser)
routers.get("/subscription/oracle/:oracleId", subscriptionController.getsByOracle)

export default routers;
