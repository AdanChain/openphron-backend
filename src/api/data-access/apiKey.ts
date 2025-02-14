import { generateApiKey } from "../utils";
import BaseDataAccess from "./basic";

class ApiKeyDA extends BaseDataAccess {
    constructor(dbModel: any) {
        super(dbModel);
    }

    async createApiKey(userId: string, apiKey: string): Promise<any> {
        let data;
        const isExist = await this.userIdExists(userId)
        data = {
            userIds: {
                [userId]: isExist
                    ? { $push: { apiKey, status: 'active', createdAt: new Date() } }
                    : [
                        { apiKey, status: 'active', createdAt: new Date() }
                    ]
            },
            allApiKeys: {
                [apiKey]: { userId, status: 'active', createdAt: new Date() }
            }
        }
        if (!await this.findOne({ $exists: true })) {
            await this.create(data);
            return;
        }
        this.update({}, data);
    }


    async getApiKeysByUserId(userId: string | undefined): Promise<any[]> {
        const apiKeys = await this.userIdExists(userId);
        if (!apiKeys) {
            return [];
        }
        return apiKeys;
    }

    async deleteApiKey(apiKey: string): Promise<any> {
        const apiKeyExists = await this.apiKeyExists(apiKey);
        if (!apiKeyExists) {
            return false;
        }
        const userId = apiKeyExists.userId;
        const data = {
            userIds: {
                [userId]: {
                    $pull: { apiKey }
                }
            },
            allApiKeys: {
                $unset: { [apiKey]: "" }
            }
        }
        this.update({}, data);
        return true;
    }

    async userIdExists(userId: string | undefined): Promise<any> {
        if (!userId) return false;
        const data = await this.findOne({ userIds: { [userId]: { $exists: true } } });
        return !data ? false : data.userIds[userId];
    }

    async apiKeyExists(apiKey: string | undefined): Promise<any> {
        if (!apiKey) return false;
        const data = await this.findOne({ allApiKeys: { [apiKey]: { $exists: true } } });
        return !data ? false : data.allApiKeys[apiKey];
    }
}

export default ApiKeyDA;