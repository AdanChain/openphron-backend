import BaseDataAccess from "./baseDataAccess";
import { UserContracts, UserToken, Workflows } from "../models";
import UserContractDA from "./userContractDA";
import CostDA from "./costDA";

const workflowsDA = new BaseDataAccess(Workflows);
const userContractsDA = new UserContractDA(UserContracts);
const costDA = new CostDA(UserToken);

export {
    workflowsDA,
    userContractsDA,
    costDA
}