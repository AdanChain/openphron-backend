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
    user_address: String,
    steps: [StepSchema],
    shared_at: Date,
    visibility: String,
    expires_at: Date,
    access_token: String
});

const SharedContracts = mongoose.model('SharedContract', SharedContractSchema);

export default SharedContracts;