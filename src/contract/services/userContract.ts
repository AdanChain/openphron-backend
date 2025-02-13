import { v4 as uuidv4 } from 'uuid';
import { costDA, userContractsDA } from "../data-access";
import assistorService from "./assistor";
import workflowService from "./workflow";

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
            compileError: [],
            testError: [],
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
    deleteContractById: async (filter: any) => {
        const { _id } = filter;
        await userContractsDA.delete({ _id });
    },
    saveError: async (filter: any) => {
        const { contractId, error } = filter;

        await userContractsDA.saveError({ contractId, error });
    }
}

export default userContractService;