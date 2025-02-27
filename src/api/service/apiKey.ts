import { apiKeyDA } from "../data-access";
import { formatDate, generateApiKeyWithCryptoJs } from "../utils";

const apiKeyService = {
    createApiKey: async (userId: string | undefined, name?: string) => {
        if (!userId) return false;
        const apiKey = generateApiKeyWithCryptoJs(name);

        if (await apiKeyDA.apiKeyExists(apiKey, userId)) {
            await apiKeyService.createApiKey(userId, name);
        }

        // const createdAt = formatDate(new Date());
        const userApiKey = await apiKeyDA.create({ userId, name, apiKey });
        return userApiKey;
    },
    deleteApiKey: async (apiKey: string | undefined, userId: string | undefined) => {
        const apiKeyExists = await apiKeyDA.apiKeyExists(apiKey, userId);
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
    availableApiKey: async (apiKey: string | undefined, address: string | undefined) => {
        const apiKeyExists = await apiKeyDA.apiKeyExists(apiKey, address);
        return apiKeyExists;
    }
};

export default apiKeyService;