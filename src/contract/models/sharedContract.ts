import { create } from 'domain';
import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema({
    role: String,
    content: String
})

const StepSchema = new Schema({
    history: [MessageSchema],
    result: String
})

const SharedContractSchema = new mongoose.Schema({
    id: String,
    userAddress: String,
    name: String,
    steps: [StepSchema],
    workflowId: String,
    visibility: String,
    sharedAt: Date,
    expiresAt: Date,
    createdAt: Date,
    updatedAt: Date,
    access_token: String
});

const SharedContracts = mongoose.model('SharedContract', SharedContractSchema);

export default SharedContracts;