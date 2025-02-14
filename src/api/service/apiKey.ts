import { apiKeyDA } from "../data-access";
import { generateApiKey } from "../utils";

const apiKeyService = {
    createApiKey: async (userId: string | undefined, name?: string) => {
        if (!userId) return false;
        const apiKey = generateApiKey(name);

        if (await apiKeyDA.apiKeyExists(apiKey)) {
            await apiKeyService.createApiKey(userId, name);
        }
        const userApiKey = await apiKeyDA.create({ userId, name, apiKey });
        return userApiKey;
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