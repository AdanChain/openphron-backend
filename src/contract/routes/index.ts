import express from "express";
import workflowContoller from "../controllers/workflow";
import contractController from "../controllers/contract"
export const routers = express();

routers.get("/contract/:userAddress", contractController.getContracts);
routers.post("/contract", contractController.sendInitMessage);
routers.post("/contract/message", contractController.sendMessage);

routers.post("/contract/save-result", contractController.saveResult);

routers.get("/workflow", workflowContoller.getWorkflows);
routers.get("/workflow/:id", workflowContoller.getWorkflowById);

export default routers;