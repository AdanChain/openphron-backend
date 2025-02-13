import BaseDataAccess from "./baseDataAccess";
import {
  UserContracts,
  UserToken,
  Workflows,
  DeployedContracts,
} from "../models";
import UserContractDA from "./userContractDA";
import CostDA from "./costDA";
import DeployedContractsDA from "./deployedContractsDA";

const workflowsDA = new BaseDataAccess(Workflows);
const userContractsDA = new UserContractDA(UserContracts);
const costDA = new CostDA(UserToken);
const deployedContractsDA = new DeployedContractsDA(DeployedContracts);

export { workflowsDA, userContractsDA, costDA, deployedContractsDA };
