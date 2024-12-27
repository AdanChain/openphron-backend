import GEMINI from "./gemini";

const gemini = new GEMINI(process.env.GEMINI_KEY as string);

const prettyJSON = (data: any): string => JSON.stringify(data, null, 2);

export { gemini, prettyJSON };
