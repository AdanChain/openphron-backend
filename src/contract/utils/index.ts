import GEMINI from "./gemini";

const gemini = new GEMINI(process.env.GEMINI_KEY as string);

const prettyJSON = (data: any): string => JSON.stringify(data, null, 2);

export { gemini, prettyJSON };

export const calculateTokenCost = (tokensUsed: number) => {
  const costPerToken = 0.01 / 1000; // $0.01 per 1000 tokens
  return tokensUsed * costPerToken;
};
export const tokenize = (message:string) => {
  const averageTokenLength = 4;
  return Math.ceil(message.length/averageTokenLength);
}
