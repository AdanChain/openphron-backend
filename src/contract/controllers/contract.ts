import { response } from "express";
import userContractService from "../services/userContract";

const contractController = {
  sendInitMessage: async (req: any, res: any): Promise<void> => {
    try {
      const userAddress = req.user;
      const { initMessage } = req.body;
      const userContract = await userContractService.create({
        userAddress,
        initMessage,
      });
      res.json(userContract);
    } catch (error: any) {
      console.log("sendInitMessage-error: ", error.message);
      res.json(error.message);
    }
  },
  sendMessage: async (req: any, res: any): Promise<void> => {
    try {
      const userAddress = req.user;
      const { _id, stepId, content } = req.body;
      const response = await userContractService.addMessage({
        _id,
        stepId,
        content,
        userAddress,
      });
      res.json(response);
    } catch (error: any) {
      console.log("send-message-error: ", error.message);
      res.json(error.message);
    }
  },
  getContracts: async (req: any, res: any): Promise<void> => {
    try {
      const userAddress = req.user;
      const contracts = await userContractService.getContractsByUser(
        userAddress
      );
      res.json(contracts);
    } catch (error: any) {
      console.log("get-contract-error: ", error.message);
    }
  },
  saveResult: async (req: any, res: any): Promise<void> => {
    try {
      const { _id, stepId } = req.body;
      const result = await userContractService.saveResult({ _id, stepId });
      res.json(result);
    } catch (error: any) {
      res.json(error.message);
      console.log("save-result-error: ", error.message);
    }
  },
  deleteContract: async (req: any, res: any): Promise<void> => {
    try {
      const { _id }: { _id: string } = req.params;
      await userContractService.deleteContractById({ _id });
      res.json({ res: "success" });
    } catch (error: any) {
      console.log("delete-contract-error", error.message);
    }
  },
  addDeployedContracts: async (req: any, res: any): Promise<void> => {
    try {
      const userAddress = req.user;
      const { contractAddress, networkId } = req.body;
      const userContract = await userContractService.addDeployedContract({
        userAddress,
        contractAddress,
        networkId,
      });
      res.json(userContract);
    } catch (error: any) {
      console.log("sendInitMessage-error: ", error.message);
      res.json(error.message);
    }
  },
  getDeployedContracts: async (req: any, res: any): Promise<void> => {
    try {
      const userAddress = req.user;
      const { limit, page } = req.query;
      const contracts = await userContractService.getDeployedContracts({
        limit,
        page,
      });
      res.json(contracts);
    } catch (error: any) {
      console.log("get-contract-error: ", error.message);
    }
  },
};

export default contractController;
