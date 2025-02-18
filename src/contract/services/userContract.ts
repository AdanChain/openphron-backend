import { v4 as uuidv4 } from 'uuid';
import { deployedContractsDA, userContractsDA } from "../data-access";
import assistorService from "./assistor";
import workflowService from "./workflow";
import { shareContractsDA } from '../data-access'
import { gemini } from '../utils';
import { DeployedContracts } from '../models';

const userContractService = {
  create: async (data: CreateContractData) => {
    const { userAddress, initMessage } = data;

    const contractName = await assistorService.nameFromText(initMessage, userAddress);
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
      compileError: [],
      testError: [],
    }
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
      role: "assistant",
      content: response
    }
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
      history: userContract.steps[stepId].history
    });
    await userContractsDA.saveResult({ _id, stepId, content: response });
    return response;
  },

  shareContract: async (filter: any) => {
    const { _id, isPublic } = filter;
    const userContract = await userContractsDA.findOne({ _id });
    const accessToken = uuidv4();
    const sharedAt = new Date();
    const expiresAt = new Date(sharedAt.getTime() + 1000 * 60 * 60 * 24 * 30); // 30 days

    const sharedContract = {
      id: userContract._id,
      userAddress: userContract.userAddress,
      workflowId: userContract.workflowId,
      name: userContract.name,
      steps: userContract.steps,
      createdAt: userContract.createdAt,
      updatedAt: userContract.updatedAt,
      access_token: accessToken,
      sharedAt: sharedAt,
      expiresAt: expiresAt,
      public: isPublic,
    }

    await shareContractsDA.create(sharedContract);
    return accessToken;
  },
  getSharedContract: async (access_token: string) => {
    const sharedContract = await shareContractsDA.finds({ access_token });
    if (!sharedContract) {
      return { error: "Shared contract not found" };
    }
    if (sharedContract.expiresAt && sharedContract.expiresAt < new Date()) {
      return { error: "Shared contract expired" };
    }
    return sharedContract;
  },
  deleteContractById: async (filter: any) => {
    const { _id } = filter;
    await userContractsDA.delete({ _id });
  },
  saveError: async (filter: any) => {
    const { contractId, error } = filter;

    const message = {
      role: "user",
      content: error.message,
      form: error.form
    }
    await userContractsDA.saveError({ contractId, error: message });
    console.log("message: ", message);
    const result = await gemini.generateText({ contents: [message], instruction: process.env.INSTRUCTION });
    const newDate = {
      role: "reason",
      content: result,
      form: error.form
    }
    console.log("newDate: ", newDate);
    await userContractsDA.saveError({ contractId, error: newDate });
  },
  renameContractById: async (filter: any) => {
    const { name, _id } = filter;
    await userContractsDA.update({ _id }, { name });
    return;
  },
  addSharedContract: async (filter: any) => {
    const { _id, address } = filter;
    const sharedContract = await shareContractsDA.findOne({ _id });

    const _contract = {
      id: sharedContract.id,
      userAddress: address,
      workflowId: sharedContract.workflowId,
      name: sharedContract.name,
      steps: sharedContract.steps,
      createdAt: sharedContract.createdAt,
      updatedAt: sharedContract.updatedAt
    }

    await userContractsDA.create(_contract);
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
    const deployedContracts = await deployedContractsDA.finds(
      { address: { $ne: "", $exists: true } },
      {
        skip,
        limit: _limit,
      }
    );
    const totalContracts = await DeployedContracts.countDocuments({
      address: { $ne: "", $exists: true },
    });

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
    const userDeployedContracts = await DeployedContracts.find({
      contractId: id,
    });

    return userDeployedContracts;
  },
};

export default userContractService;
