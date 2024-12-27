import BaseDataAccess from "./baseDataAccess";
import { UserContracts, Workflows } from "../models";
import UserContractDA from "./userContractDA";

const workflowsDA = new BaseDataAccess(Workflows);
const userContractsDA = new UserContractDA(UserContracts);

export {
    workflowsDA,
    userContractsDA
}