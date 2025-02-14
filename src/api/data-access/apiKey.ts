import { generateApiKey } from "../utils";
import BaseDataAccess from "./basic";

class ApiKeyDA extends BaseDataAccess {
    constructor(dbModel: any) {
        super(dbModel);
    }

    async userIdExists(userId: string | undefined): Promise<any> {
        if (!userId) return false;
        const data = await this.finds({ userId });
        return data.length > 0 ? data : false;
    }

    async apiKeyExists(apiKey: string | undefined): Promise<any> {
        if (!apiKey) return false;
        const data = await this.findOne({ apiKey });
        return data ? data : false;
    }
}

export default ApiKeyDA;