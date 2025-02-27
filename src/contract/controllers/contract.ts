import { response } from "express";
import userContractService from "../services/userContract";
import { access } from "fs";

const contractController = {
  sendInitMessage: async (req: any, res: any): Promise<void> => {
    try {
      const userAddress = req.user;
      const { initMessage, chatMode } = req.body;
      const userContract = await userContractService.create({
        userAddress,
        initMessage,
        chatMode,
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
      const response = await userContractService.addMessage({ _id, stepId, content, userAddress });
      res.json(response);
    } catch (error: any) {
      console.log("send-message-error: ", error.message);
      res.json(error.message);
    }
  },
  getContracts: async (req: any, res: any): Promise<void> => {
    try {
      const userAddress = req.user;
      const contracts = await userContractService.getContractsByUser(userAddress);
      res.json(contracts);
    } catch (error: any) {
      console.log("get-contract-error: ", error.message);
    }
  },
  shareContract: async (req: any, res: any): Promise<void> => {
    try {
      const { id, isPublic } = req.body;
      const result = await userContractService.shareContract({ _id: id, isPublic });
      res.json(result);
    } catch (error: any) {
      res.json(error.message);
      console.log("share-contract-error: ", error.message);
    }
  },
  getSharedContract: async (req: any, res: any): Promise<void> => {
    try {
      const { access_token } = req.params;
      const result = await userContractService.getSharedContract(access_token);
      res.json(result);
    } catch (error: any) {
      res.json(error.message);
      console.log("get-shared-contracts-error: ", error.message);
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
  saveError: async (req: any, res: any): Promise<void> => {
    try {
      const { contractId, error } = req.body;
      await userContractService.saveError({ contractId, error });
      res.json({ res: "success" });
    } catch (error: any) {
      console.log("save-error-error", error.message);
      res.json(error.message);
    }
  },
  renameContract: async (req: any, res: any) => {
    try {
      const { name, contract_Id } = req.body;
      await userContractService.renameContractById({ name, _id: contract_Id });
      res.json({ res: "success" });
    } catch (error: any) {
      console.log("rename-contract-error: ", error.message)
    }
  },
  addSharedContract: async (req: any, res: any) => {
    try {
      const { _id, address } = req.body;
      await userContractService.addSharedContract({ _id, address });
      res.json({ res: "success" });
    } catch (error: any) {
      console.log("add-shared-contract-error: ", error.message)
    }
  },
  addDeployedContracts: async (req: any, res: any): Promise<void> => {
    try {
      const userAddress = req.user;
      const { contractAddress, chainId, abi, contractId } = req.body;
      const userContract = await userContractService.addDeployedContract({
        userAddress,
        address: contractAddress,
        chainId,
        abi: JSON.stringify(abi),
        contractId,
      });
      res.json(userContract);
    } catch (error: any) {
      console.log("sendInitMessage-error: ", error.message);
      res.json(error.message);
    }
  },
  getDeployedContracts: async (req: any, res: any): Promise<void> => {
    try {
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
  getUserDeployedContracts: async (req: any, res: any): Promise<void> => {
    try {
      const { id } = req.params;

      const userDeployedContract = await userContractService.getUserDeployedContract(id);

      const contractsData = userDeployedContract.map((d: any) => {
        return {
          userAddress: d.userAddress,
          address: d.address,
          chainId: d.chainId,
          //@ts-ignore
          abi: JSON.parse(d?.abi),
          contractId: d.contractId,
        };
      });

      // [
      //   {
      //     userAddress: userDeployedContract.userAddress,
      //     address: userDeployedContract.address,
      //     chainId: userDeployedContract.chainId,
      //     abi: JSON.parse(userDeployedContract.abi),
      //     contractId: userDeployedContract.contractId,
      //   },
      // ]
      res.json(contractsData);
    } catch (error: any) {
      console.log("getUserDeployedContracts: ", error.message);
    }
  },
};

export default contractController;
