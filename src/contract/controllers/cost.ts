import { costService } from "../services";

const costController = {
    reduceTokens: async (req: any, res: any) => {
        try {
            const token = req.body.token;
            const address = req.user;
            const respose = await costService.reduceTokens(address, token);
            res.json(respose);
        } catch (error: any) {
            console.log("UpdateToken-error:", error.message)
        }
    },
    getTokens: async (req: any, res: any) => {
        try {
            const address = req.user;
            const response = await costService.getTokens(address);
            res.json(response);
        } catch (error: any) {
            console.log("GetToken-Error", error.message)
        }
    },
    subscribeTokens: async (req: any, res: any) => {
        try {
            const address = req.user;
            const id = req.body
            const respose = await costService.subscribeTokens(address,id);
            res.json({ success: true })
        } catch (error: any) {
            console.log("subscribeToken-Error:", error.message)
        }
    }
}

export default costController;