import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema({
    role: String,
    content: String
})

const SharedContractSchema = new mongoose.Schema({
    user_id: String,
    content: [MessageSchema],
    shared_at: Date,
    expires_at: Date,
    access_token: String
});

const SharedContract = mongoose.model('SharedContract', SharedContractSchema);

export default SharedContract;