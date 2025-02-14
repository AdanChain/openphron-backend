import { costService } from "../services";
import BaseDataAccess from "./baseDataAccess";

class UserContractDA extends BaseDataAccess {
    constructor(dbModel: any) {
        super(dbModel);
    }

    async addMessage(data: { _id: string; stepId: number; message: IMessage }): Promise<any> {
        const { _id, stepId, message } = data;
        const userContract = await this.findOne({ _id });

        if (userContract && userContract.steps[stepId]) {
            await costService.reduceTokens(userContract.userAddress, message.content);

            userContract.steps[stepId].history.push(message);
            const result = await this.update({ _id }, userContract);
            return result;
        }
        throw new Error("User contract or step not found");
    }

    async saveResult(data: { _id: string; stepId: number; content: string }): Promise<string> {
        const { _id, stepId, content } = data;
        const userContract = await this.findOne({ _id });

        if (userContract && userContract.steps[stepId]) {
            await costService.reduceTokens(userContract.userAddress, content);
            userContract.steps[stepId].result = content;

            // Remove the next steps
            userContract.steps = userContract.steps.map((step: IStep, index: number) =>
                index <= stepId ? step : { history: [], result: null }
            );

            await this.update({ _id }, userContract);
            return content;
        }
        throw new Error("User contract or step not found");
    }
    async saveError(data: { contractId: string; error: any }): Promise<string> {
        const { contractId, error } = data;
        const userContract = await this.findOne({ _id: contractId });
        if (userContract) {
            if(error.form === "compile"){
                userContract.compileError.push({content:error.message,time:new Date()});
            }else{
                userContract.testError.push({content:error.message,time:new Date()} );
            }
            await this.update({ _id: contractId }, userContract);
            return "success";
        }
        throw new Error("User contract not found");
    }
}   

export default UserContractDA;
