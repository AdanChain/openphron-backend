import mongoose, { Schema } from "mongoose";

export const MessageSchema = new Schema({
    role: String,
    content: String
})

const StepSchema = new Schema({
    history: [MessageSchema],
    result: String
})

const UserContractSchema = new Schema({
    id: String,
    userAddress: String,
    name: String,
    workflowId: String,
    steps: [StepSchema]
},
    { timestamps: true }
)

const UserContracts = mongoose.model("userContracts", UserContractSchema);

export default UserContracts;
