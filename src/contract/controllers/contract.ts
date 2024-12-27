import userContractService from "../services/userContract";
import { Request, Response } from "express";

const contractController = {
    sendInitMessage: async (req: Request, res: Response): Promise<void> => {
        try {
            const { userAddress, initMessage }: { userAddress: string, initMessage: string } = req.body;
            console.log({ userAddress, initMessage })
            const userContract = await userContractService.create({ userAddress, initMessage });
            console.log({ userContract })
            res.json(userContract);
        } catch (error: any) {
            console.log("sendInitMessage-error: ", error.message);
        }
    },
    sendMessage: async (req: Request, res: Response): Promise<void> => {
        try {
            const { _id, stepId, content } = req.body;
            const response = await userContractService.addMessage({ _id, stepId, content });
            res.json(response);
        } catch (error: any) {
            console.log("send-message-error: ", error.message);
        }
    },
    getContracts: async (req: Request, res: Response): Promise<void> => {
        try {
            const { userAddress } = req.params;
            console.log({ userAddress })
            const contracts = await userContractService.getContractsByUser(userAddress);
            res.json(contracts);
        } catch (error: any) {
            console.log("get-contract-error: ", error.message);
        }
    },
    saveResult: async (req: Request, res: Response): Promise<void> => {
        try {
            const { _id, stepId } = req.body;
            console.log("save-result", req.body)
            const result = await userContractService.saveResult({ _id, stepId });
            res.json(result);
        } catch (error: any) {
            console.log("save-result-error: ", error.message);
        }
    },
    deleteContract: async (req: any, res: any): Promise<void> => {
        try {
            const { _id }: { _id: string } = req.params;
            await userContractService.deleteContractById({ _id });
            console.log("delete-contract");
            res.json({ res: "success" });
        } catch (error: any) {
            console.log("delete-contract-error", error.message);
        }
    }
}

export default contractController;