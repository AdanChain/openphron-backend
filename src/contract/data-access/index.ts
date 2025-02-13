import BaseDataAccess from "./baseDataAccess";
import { UserContracts, UserToken, Workflows, SharedContracts } from "../models";
import UserContractDA from "./userContractDA";
import CostDA from "./costDA";

const workflowsDA = new BaseDataAccess(Workflows);
const userContractsDA = new UserContractDA(UserContracts);
const costDA = new CostDA(UserToken);
const shareContractsDA = new BaseDataAccess(SharedContracts)

export {
    workflowsDA,
    userContractsDA,
    costDA,
    shareContractsDA
}