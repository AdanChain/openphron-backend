import { v4 as uuidv4 } from 'uuid';
import { costDA, userContractsDA } from "../data-access";
import assistorService from "./assistor";
import workflowService from "./workflow";
import SharedContract from '../models/sharedContract';

const userContractService = {
    create: async (data: CreateContractData) => {
        const { userAddress, initMessage } = data;

        const contractName = await assistorService.nameFromText(initMessage, userAddress);
        const workflow = await workflowService.getById(1);
        const assistors = workflow.assistors;
        const steps = assistors.map(() => ({ history: [] }));

        const uniqueId = uuidv4();
        let userContract: any = {
            id: uniqueId,
            userAddress,
            workflowId: 1,
            name: contractName,
            steps: steps,
        }
        userContract = await userContractsDA.create(userContract);

        await userContractService.addMessage({
            _id: userContract._id,
            stepId: 0,
            content: initMessage
        });

        userContract = await userContractsDA.findOne({ _id: userContract._id });
        return userContract;
    },
    get: async (filter: { _id: string }) => {
        const { _id } = filter;
        const contract = await userContractsDA.findOne({ _id });
        return contract;
    },
    addMessage: async (data: AddMessageData) => {
        const { _id, stepId, content, userAddress } = data;

        const message = {
            role: "user",
            content
        }
        await userContractsDA.addMessage({ _id, stepId, message });
        const userContract = await userContractsDA.findOne({ _id });

        const response = await assistorService.generateText({
            workflowId: userContract.workflowId,
            stepId,
            history: userContract.steps[stepId].history
        });

        const responseMessage = {
            role: "assistant",
            content: response
        }
        await userContractsDA.addMessage({ _id, stepId, message: responseMessage });
        return { responseMessage };
    },
    getContractsByUser: async (userAddress: string) => {
        const contracts = await userContractsDA.finds({ userAddress });
        return contracts;
    },
    saveResult: async (filter: any) => {
        const { _id, stepId } = filter;
        const userContract = await userContractsDA.findOne({ _id });
        const response = await assistorService.extractResult({
            workflowId: userContract.workflowId,
            stepId,
            history: userContract.steps[stepId].history
        });
        await userContractsDA.saveResult({ _id, stepId, content: response });
        return response;
    },
    shareContract: async (filter: any) => {
        const { id } = filter;
        const userContract = await userContractsDA.findOne({ id });
        const accessToken = uuidv4();
        const sharedAt = new Date();
        const expiresAt = new Date(sharedAt.getTime() + 1000 * 60 * 60 * 24 * 30); // 30 days

        await SharedContract.create({
            user_id: userContract.userAddress,
            content: userContract.steps,
            shared_at: sharedAt,
            expires_at: expiresAt,
            access_token: accessToken,
        });

        return accessToken;
    },
    deleteContractById: async (filter: any) => {
        const { _id } = filter;
        await userContractsDA.delete({ _id });
    }
}

export default userContractService;