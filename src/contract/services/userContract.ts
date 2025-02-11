import { v4 as uuidv4 } from "uuid";
import { costDA, userContractsDA, deployedContractsDA } from "../data-access";
import DeployedContracts from "../models/deployedContracts";
import assistorService from "./assistor";
import workflowService from "./workflow";

const userContractService = {
  create: async (data: CreateContractData) => {
    const { userAddress, initMessage } = data;

    const contractName = await assistorService.nameFromText(
      initMessage,
      userAddress
    );
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
    };
    userContract = await userContractsDA.create(userContract);

    await userContractService.addMessage({
      _id: userContract._id,
      stepId: 0,
      content: initMessage,
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
      content,
    };
    await userContractsDA.addMessage({ _id, stepId, message });
    const userContract = await userContractsDA.findOne({ _id });

    const response = await assistorService.generateText({
      workflowId: userContract.workflowId,
      stepId,
      history: userContract.steps[stepId].history,
    });

    const responseMessage = {
      role: "model",
      content: response,
    };
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
      history: userContract.steps[stepId].history,
    });
    await userContractsDA.saveResult({ _id, stepId, content: response });
    return response;
  },
  deleteContractById: async (filter: any) => {
    const { _id } = filter;
    await userContractsDA.delete({ _id });
  },
  addDeployedContract: async (data: any) => {
    console.log(data);
    const userContract = await DeployedContracts.create({ ...data });
    //deployedContractsDA.create(data);

    return userContract;
  },
  getDeployedContracts: async (optionalFilters?: any) => {
    const { limit, page } = optionalFilters;

    const _page = parseInt(page, 10) || 1;
    const _limit = parseInt(limit, 10) || 1;
    // Calculate skip value
    const skip = (_page - 1) * _limit;
    const deployedContracts = await deployedContractsDA.finds(null, {
      skip,
      limit: _limit,
    });
    const totalContracts = await deployedContractsDA.countContracts();

    // Calculate total pages
    const totalPages = Math.ceil(totalContracts / _limit);

    return {
      data: deployedContracts || [],
      totalData: totalContracts,
      totalContracts,
      totalPages,
      currentPage: _page,
    };
  },
  getUserDeployedContract: async (id: any) => {
    const userDeployedContracts = await deployedContractsDA.findOne({
      contractId: id,
    });

    return userDeployedContracts;
  },
};

export default userContractService;
