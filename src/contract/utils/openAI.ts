import axios from "axios";
import { HttpsProxyAgent } from 'https-proxy-agent';

class OPENAI {
    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async generateTextFromMessage(message: string): Promise<string> {
        const contents: Content[] = [{
            role: "user",
            content: message
        }];
        const data = {
            model: "chatgpt-4o-latest",
            messages: contents
        };
        return this._generateFromOpenAI(data);
    }

    async generateText({ contents, instruction = "" }: { contents: Content[]; instruction?: string }): Promise<string> {
        const messages = instruction 
            ? [{ role: "system", content: instruction }, ...contents]
            : contents;
        
        const data = {
            model: "chatgpt-4o-latest",
            messages: messages
        };
        return this._generateFromOpenAI(data);
    }

    private async _generateFromOpenAI(data: any): Promise<string> {
        const apiUrl = "https://api.openai.com/v1/chat/completions";
        const maxRetries = 3;
        const baseDelay = 5000;

        let lastError = null;
        for (let attempt = 0; attempt < maxRetries; attempt++) {
            try {
                console.log(`Making attempt ${attempt + 1}/${maxRetries}`);
                const headers = {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                };

                const config = process.env.PROXY_ENABLE 
                    ? { headers, httpsAgent: this.getAgent() }
                    : { headers };

                const response = await axios.post(apiUrl, data, config);
                return response.data.choices[0].message.content;

            } catch (error: any) {
                const errorData = error.response?.data?.error;
                
                // Immediately throw on quota errors - no point in retrying
                if (errorData?.code === 'insufficient_quota' || 
                    errorData?.message?.includes('exceeded your current quota')) {
                    throw new Error(
                        'OpenAI API quota exceeded. Please check your billing details at https://platform.openai.com/account/billing'
                    );
                }

                lastError = error;
                const errorMessage = errorData?.message || error.message;
                console.log(`Error details: ${errorMessage}`);

                // Only retry on rate limits or temporary errors
                if (error.response?.status === 429 || 
                    error.response?.status >= 500) {
                    if (attempt < maxRetries - 1) {
                        const retryAfter = error.response?.headers?.['retry-after'];
                        const delayMs = retryAfter 
                            ? parseInt(retryAfter) * 1000
                            : baseDelay * Math.pow(2, attempt);
                            
                        console.log(`Retrying after error. Attempt ${attempt + 1}/${maxRetries}. Waiting ${delayMs/1000} seconds...`);
                        await new Promise(resolve => setTimeout(resolve, delayMs));
                        continue;
                    }
                }

                // For non-retryable errors, throw immediately
                throw new Error(`OpenAI API error: ${errorMessage}`);
            }
        }

        throw lastError || new Error(`Failed after ${maxRetries} attempts`);
    }

    private getAgent() {
        const proxyHost = process.env.PROXY_HOST;
        const proxyPort = 42567; // Replace with your proxy's port
        const proxyUser = process.env.PROXY_USER; // Optional
        const proxyPass = process.env.PROXY_PASS; // Optional
        // Create a proxy agent
        const proxyUrl = `http://${proxyUser}:${proxyPass}@${proxyHost}:${proxyPort}`;
        return new HttpsProxyAgent(proxyUrl);
    }
}

export default OPENAI;
