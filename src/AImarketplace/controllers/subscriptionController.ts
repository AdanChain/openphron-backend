import { subscribe } from "diagnostics_channel";
import { subscriptionService } from "../service";

const subscriptionController = {

    getByUser: async (req: any, res: any) => {
        try {
            const userAddress = req.user;
            const subscriptionData = await subscriptionService.getByUser(userAddress);
            console.log("subscriptionData", userAddress)
            res.status(200).json(subscriptionData);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },
    getsByOracle: async (req: any, res: any) => {
        try {
            const { oracleId } = req.params;
            const subscriptionData = await subscriptionService.getsByOracle(oracleId);
            res.status(200).json(subscriptionData);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },
    subscribe: async (req: any, res: any) => {
        try {
            const { userContract, oracleId } = req.body;
            const userAddress = req.user;
            const subscriptionData = await subscriptionService.subscribe({
                user: userAddress,
                userContract: userContract,
                oracleId: oracleId
            });
            res.status(200).json(subscriptionData);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default subscriptionController;