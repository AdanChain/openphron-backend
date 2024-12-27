import express from "express";
import { oracleController, questionController, subscriptionController } from "../controllers";
const router = express.Router();

router.get("/oracle", oracleController.gets)
router.get("/oracle/:id", oracleController.getById)

router.get("/question", questionController.gets)
router.get("/question/:id", questionController.getById)
router.get("/question/oracle/:oracleId", questionController.questionsForOracle)

router.get("/subscription/user/:userAddress", subscriptionController.getByUser)
router.get("/subscription/oracle/:oracleId", subscriptionController.getsByOracle)

export default router;