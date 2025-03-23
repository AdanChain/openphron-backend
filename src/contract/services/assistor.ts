import fs from "fs";
import { costDA, userContractsDA } from "../data-access";
import UserContractDA from "../data-access/userContractDA";
import { gemini } from "../utils";
import costService from "./cost";
import workflowService from "./workflow";
import path from "path";
import { log } from "console";

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
        //bring the package.json file
        // const packageJson = assistorService._getPackageJson();
        // const instruction = stepId === 0 ? `${assistor.instruction}` : `You are using the following package.json file: ${packageJson}\n${assistor.instruction}`;
        // console.log(instruction);
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
    },
    _getPackageJson: () => {
        const packageJsonPath = path.join(__dirname, "../../../../openphron-contract-compiler/package.json");
        const packageJson = fs.readFileSync(packageJsonPath, 'utf8');
        return packageJson;
    }
};
export default assistorService;