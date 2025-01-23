import { costDA, userContractsDA } from "../data-access";
import UserContractDA from "../data-access/userContractDA";
import { gemini } from "../utils";
import costService from "./cost";
import workflowService from "./workflow";

const assistorService = {
    nameFromText: async (text: string, address: string): Promise<string> => {
        await costService.validateToken(address, text);
        const contractNames = await assistorService.extractAllContractNames(address);

        const prompt = `Summarize the following idea into one meaningful word. Provide the word alone, without any additional text or explanation, and make sure it doesn't overlap with the following word. \n
                         ${contractNames}\n ${text}`;
        const generatedName = await gemini.generateTextFromMessage(prompt);
        return generatedName;
    },

    generateText: async (data: GenerateTextData): Promise<string> => {
        const { workflowId, stepId, history } = data;
        const assistor = await assistorService._getAssistor({ workflowId, stepId });
        const result = await gemini.generateText({ contents: history, instruction: assistor.instruction });
        return result;
    },

    extractResult: async (data: any): Promise<string> => {
        const { workflowId, stepId, history } = data;
        const assistor = await assistorService._getAssistor({ workflowId, stepId });

        const extractMessage = {
            role: "user",
            content: assistor.result_instruction
        };

        const result = await gemini.generateText({ contents: [...history, extractMessage], instruction: assistor.instruction });
        return result;
    },

    _getAssistor: async (data: GetAssistorData): Promise<any> => {
        const { workflowId, stepId } = data;
        const workflow = await workflowService.getById(workflowId);
        return workflow.assistors[stepId];
    },
    extractAllContractNames: async (address: string) => {
        const allContracts = await userContractsDA.finds({ userAddress: address });
        const contractNames = allContracts.map((contract: any) => contract.name);
        return contractNames.join(",");
    }
};
export default assistorService;