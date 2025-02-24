interface Content {
  role: string;
  content: string;
}

interface GeminiData {
  contents: GeminiContent[];
  system_instruction: InstructionFormat;
}

interface GeminiContent {
  role: string;
  parts: { text: string }[];
}

interface InstructionFormat {
  parts: { text: string };
}

interface CreateContractData {
  userAddress: string;
  initMessage: string;
  chatMode: string;
}

interface AddMessageData {
  _id: any;
  stepId: number;
  content: string;
  userAddress?: string;
}

interface SaveResultFilter {
  _id: any;
  stepId: number;
}

interface GenerateTextData {
  workflowId: number;
  stepId: number;
  history: Array<{ role: string; content: string }>;
}

interface ExtractResultData {
  workflowId: number;
  stepId: number;
  history: Array<{ role: string; content: string }>;
}

interface GetAssistorData {
  workflowId: number;
  stepId: number;
}

interface IMessage {
  role: string;
  content: string;
}

interface IStep {
  history: IMessage[];
  result: string;
}

interface IUserContract {
    id: string;
    userAddress: string;
    name: string;
    workflowId: string | number;
    steps: IStep[];
    compileError: IError[];
    testError: IError[];
}   

interface IError {
    content: string;
    time: Date;
}
