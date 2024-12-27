import { subscriptionService } from "../service";
import { Request, Response } from "express";

const subscriptionController = {

    getByUser: async (req: Request, res: Response) => {
        try {
            const { userAddress } = req.params;
            const subscriptionData = await subscriptionService.getByUser(userAddress);
            console.log("subscriptionData", userAddress)
            res.status(200).json(subscriptionData);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },
    getsByOracle: async (req: Request, res: Response) => {
        try {
            const { oracleId } = req.params;
            const subscriptionData = await subscriptionService.getsByOracle(oracleId);
            res.status(200).json(subscriptionData);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },
}

export default subscriptionController;