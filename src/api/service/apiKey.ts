import { apiKeyDA } from "../data-access";
import { generateApiKey } from "../utils";

const apiKeyService = {
    createApiKey: async (userId: string | undefined, hint?: string) => {
        if (!userId) return false;
        const apiKey = generateApiKey(hint);

        if (await apiKeyDA.apiKeyExists(apiKey)) {
            await apiKeyService.createApiKey(userId, hint);
        }
        await apiKeyDA.create({ userId, name: hint, apiKey });
        return apiKey;
    },
    deleteApiKey: async (apiKey: string | undefined) => {
        const apiKeyExists = await apiKeyDA.apiKeyExists(apiKey);
        if (!apiKeyExists) {
            return false;
        }
        await apiKeyDA.delete({ apiKey });
        return true;
    },
    getApiKeys: async (userId: string | undefined) => {
        const apiKeys = await apiKeyDA.userIdExists(userId);
        if (!apiKeys) {
            return [];
        }
        return apiKeys;
    },
    availableApiKey: async (apiKey: string | undefined) => {
        const apiKeyExists = await apiKeyDA.apiKeyExists(apiKey);
        return apiKeyExists;
    }
};

export default apiKeyService;