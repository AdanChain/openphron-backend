import { Schema, model } from 'mongoose';

const UserApiKeysSchema = new Schema({
    userId: String,
    name: String,
    apiKey: String,
    status: { type: String, default: 'active' },
    createdAt: { type: Date, default: new Date() },
});

const ApiKeyModel = model('ApiKey', UserApiKeysSchema);

export default ApiKeyModel;