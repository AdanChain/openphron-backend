import BaseDataAccess from "./baseDataAccess";

class CostDA extends BaseDataAccess {
    constructor(dbModel: any) {
        super(dbModel);
    }
    async createByAddress(address: string) {
        const data = {
            userAddress: address,
            remainingTokens: process.env.INIT_TOKEN_LIMIT || 10000,
            remainingDays: process.env.INIT_DAY_LIMIT || 30,
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
}

export default CostDA
