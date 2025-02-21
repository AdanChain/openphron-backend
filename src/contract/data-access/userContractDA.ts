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
            if (error.form === "compile") {
                userContract.compileError.push({ role: error.role, content: error.content, time: new Date(), reason: null });
            } else {
                userContract.testError.push({ role: error.role, content: error.content, time: new Date(), reason: null });
            }
            await this.update({ _id: contractId }, userContract);
            if (error.form === "compile") {
                const contract = await this.findOne({ _id: contractId });
                const id = contract.compileError[contract.compileError.length - 1]._id
                return id;
            }
            else {
                const contract = await this.findOne({ _id: contractId });
                const id = contract.testError[contract.testError.length - 1]._id
                return id;
            }

        }
        throw new Error("User contract not found");
    }

    async saveErrorReason(data: { contractId: any, id: any, result: any, errorType: any }): Promise<string> {
        const { contractId, id, result, errorType } = data;
        const userContract = await this.findOne({ _id: contractId });
        if (userContract) {
            if (errorType === "compile") {
                await this.update({ _id: contractId, "compileError._id": id }, { $set: { "compileError.$.reason": result } })
               
            } else {
                await this.update({ _id: contractId, "testError._id": id }, { $set: { "testError.$.reason": result } })
            };
            return "success";
        }
        throw new Error("User contract not found");
    }

    async deleteError(id: string, errorId: string, errorType: string) {
        try {
            if (errorType === "compile") {
                const result = await this.update({ _id: id }, { $pull: { compileError: { _id: errorId } } });
                return "success";
            }
            const result = await this.update({ _id: id }, { $pull: { testError: { _id: errorId } } });
            return "success";
        } catch (error) {

        }
    }
}

export default UserContractDA;
