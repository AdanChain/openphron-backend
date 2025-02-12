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

      console.log("getUser deployed contracts", id);

      const userDeployedContract =
        await userContractService.getUserDeployedContract(id);

      console.log("userDeployedContract", userDeployedContract);
      const contractsData = userDeployedContract.map((d) => [
        {
          userAddress: d.userAddress,
          address: d.address,
          chainId: d.chainId,
          //@ts-ignore
          abi: JSON.parse(d?.abi),
          contractId: d.contractId,
        },
      ]);

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
