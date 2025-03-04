import GEMINI from "./gemini";
// import OPENAI from "./openAI";

// const gemini = new OPENAI(process.env.OPENAI_API_KEY as string);
const gemini = new GEMINI(process.env.GEMINI_KEY as string);

const prettyJSON = (data: any): string => JSON.stringify(data, null, 2);

export { gemini, prettyJSON };

export const calculateTokenCost = (tokensUsed: number) => {
  const costPerToken = 0.01 / 1000; // $0.01 per 1000 tokens
  return tokensUsed * costPerToken;
};
export const tokenize = (message: string) => {
  const averageTokenLength = 4;
  return Math.ceil(message.length / averageTokenLength);
}

export const tokenNum = (id: any) => {
  console.log(id.id)
  if (id.id == 1) {
    return 100000;
  }
  if (id.id == 2) {
    return 10000000;
  }
  return 100000000;
}
