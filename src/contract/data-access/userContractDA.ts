import { costService } from "../services";
import { tokenize } from "../utils";
import BaseDataAccess from "./baseDataAccess";
import { Document, Model } from "mongoose";

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
}

export default UserContractDA;
