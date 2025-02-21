import mongoose, { Schema } from "mongoose";

export const MessageSchema = new Schema({
    role: String,
    content: String
})

const ErrorSchema = new Schema({
    role: String,
    content: String,
    time: { type: Date, default: new Date() },
    reason: String,
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
    steps: [StepSchema],
    compileError: [ErrorSchema],
    testError: [ErrorSchema],
},
    { timestamps: true })

const UserContracts = mongoose.model("userContracts", UserContractSchema);

export default UserContracts;