import { apiKeyDA } from "../data-access";
import { generateApiKey } from "../utils";

const apiKeyService = {
    createApiKey: async (userId: string | undefined, hint?: string) => {
        if (!userId) return false;
        const apiKey = generateApiKey(hint);
        if (await apiKeyDA.apiKeyExists(apiKey)) {
            await apiKeyService.createApiKey(userId, hint);
        }
        await apiKeyDA.createApiKey(userId, apiKey);
        return apiKey;
    },
    deleteApiKey: async (apiKey: string | undefined) => {
        if(!apiKey) return false;
        await apiKeyDA.deleteApiKey(apiKey);
        return true;
    },
    getApiKeys: async (userId: string | undefined) => {
        const userApiKeys = await apiKeyDA.getApiKeysByUserId(userId);
        return userApiKeys;
    },
    availableApiKey: async (apiKey: string | undefined) => {
        const apiKeyExists = await apiKeyDA.apiKeyExists(apiKey);
        return apiKeyExists;
    }
};

export default apiKeyService;