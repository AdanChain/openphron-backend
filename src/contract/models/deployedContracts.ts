import mongoose, { Schema } from "mongoose";

const DeployedContractsSchema = new Schema(
  {
    userAddress: String,
    address: String,
    chainId: String,
    abi: String,
    // userId: String,
    contractId: String,
  },
  {
    timestamps: true,
  }
);

const DeployedContracts = mongoose.model(
  "deployedContracts",
  DeployedContractsSchema
);

export default DeployedContracts;
