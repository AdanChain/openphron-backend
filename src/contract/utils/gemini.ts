import axios from "axios";
import { HttpsProxyAgent } from 'https-proxy-agent';

class GEMINI {
    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async generateTextFromMessage(message: string): Promise<string> {
        const contents: Content[] = [{
            role: "user",
            content: message
        }];
        const result = await this.generateText({ contents });
        return result;
    }

    async generateText({ contents, instruction = "" }: { contents: Content[]; instruction?: string }): Promise<string> {
        const geminiContents = this._convertToGeminiFormat(contents);
        const geminiInstruction = this._convertToInstructionFormat(instruction);
        const data: GeminiData = { contents: geminiContents, system_instruction: geminiInstruction };

        return this._generateFromGemini(data);
    }

    private async _generateFromGemini(data: GeminiData): Promise<string> {
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${this.apiKey}`;
        let response;
        const proxyAgent = this.getAgent();
        if (process.env.PROXY_ENABLE) {
            response = await axios.post(apiUrl, data, {
                httpsAgent: proxyAgent,
            });
        } else
            response = await axios.post(apiUrl, data,);

        const generatedContent = response.data.candidates[0].content;
        const resultText = generatedContent.parts[0].text;
        return resultText;
    }

    private _convertToGeminiFormat(contents: Content[]): GeminiContent[] {
        return contents.map(content => ({
            role: content.role,
            parts: [{
                text: content.content
            }]
        }));
    }

    private _convertToInstructionFormat(instruction: string): InstructionFormat {
        return {
            parts: {
                text: instruction
            }
        };
    }

    private getAgent() {
        const proxyHost = process.env.PROXY_HOST;
        const proxyPort = 8888; // Replace with your proxy's port
        const proxyUser = process.env.PROXY_USER; // Optional
        const proxyPass = process.env.PROXY_PASS; // Optional
        // Create a proxy agent
        const proxyUrl = `http://${proxyUser}:${proxyPass}@${proxyHost}:${proxyPort}`;
        return new HttpsProxyAgent(proxyUrl);
    }
}

export default GEMINI;
