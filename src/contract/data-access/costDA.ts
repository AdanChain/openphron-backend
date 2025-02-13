import { tokenNum } from "../utils";
import BaseDataAccess from "./baseDataAccess";

class CostDA extends BaseDataAccess {
    constructor(dbModel: any) {
        super(dbModel);
    }
    async createByAddress(address: string,id:any) {
        const data = {
            userAddress: address,
            remainingTokens: tokenNum(id) || 1000000, // 1,000,000 tokens
            remainingDays: process.env.DAY_LIMIT || 30, // 30 days
            lastResetTime: new Date()
        }
        const isExist = await this.findOne({ userAddress: address });
        if (isExist) {
            await this.update({userAddress: address}, data);
            return await this.findOne({ userAddress: address });
        }
        const newData = new this.model(data);
        const result = await newData.save();
        return result
    }

    async addUser(user: any) {
        const isExist = await this.findOne({ userAddress: user.address });
        if (isExist) {
            return "isExist";
        }
        const data = {
            userAddress: user.address,
            remainingTokens:user.tokens, 
            remainingDays:user.days,
            lastResetTime:new Date()
        }
        const newData = new this.model(data);
        const result = await newData.save();
        return "success";
    }

    async deleteUser(address: string) {
        const result = await this.model.deleteOne({ userAddress: address });
        return result;
    }
}

export default CostDA
