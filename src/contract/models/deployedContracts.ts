import mongoose, { Schema } from "mongoose";

const DeployedContractsSchema = new Schema(
  {
    userAddress: String,
    contractAddress: String,
    networkId: String,
    // userId: String,
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
