import { apiKeyService } from "../service";

const apiKeyController = {
    createApiKey: async (req: any, res: any) => {
        try {
            const address = req.user;
            if (!address) {
                return res.status(400).json({ status: "error", message: "User ID is required" });
            }
            const { apiName } = req.body;
            const result = await apiKeyService.createApiKey(address, apiName);
            res.status(200).json({ status: "success", data: result });
        } catch (error: any) {
            res.status(500).json({ status: "error", message: error.message, });
        }
    },
    deleteApiKey: async (req: any, res: any) => {
        try {
            const { apiKey } = req.params;
            const result = await apiKeyService.deleteApiKey(apiKey);
            res.status(200).json({ status: "success", data: result });
        } catch (error: any) {
            res.status(500).json({ status: "error", message: error.message, });
        }
    },
    getApiKeys: async (req: any, res: any) => {
        try {
            const address = req.user;
            const result = await apiKeyService.getApiKeys(address);
            res.status(200).json({ status: "success", data: result });
        } catch (error: any) {
            res.status(500).json({ status: "error", message: error.message, });
        }
    },
    availableApiKey: async (req: any, res: any) => {
        try {
            const { apiKey } = req.body;
            const result = await apiKeyService.availableApiKey(apiKey);
            res.status(200).json({ status: "success", data: result });
        } catch (error: any) {
            res.status(500).json({ status: "error", message: error.message, });
        }
    }
};

export default apiKeyController;