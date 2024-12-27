import { userContractsDA } from "../data-access";
import UserContractDA from "../data-access/userContractDA";
import { gemini } from "../utils";
import workflowService from "./workflow";

const assistorService = {
    nameFromText: async (text: string): Promise<string> => {
        const prompt = `Summarize the following idea into a single, meaningful word. Provide only the word, without any additional text or explanation \n ${text}`;
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
    }
};
export default assistorService;