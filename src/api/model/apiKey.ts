import { Schema, model } from 'mongoose';

const ApiKeySchema = new Schema({
    apiKey: { type: String, required: true },
    status: { type: String, default: 'active' },
    createdAt: { type: Date, default: Date.now },
});

const userIdSchema = new Schema({
    userId: { type: String, required: true },
    status: { type: String, default: 'active' },
    createdAt: { type: Date, default: Date.now },
});

const UserApiKeysSchema = new Schema({
    userIds: {
        type: Map,
        of: [ApiKeySchema],
    },
    allApiKeys: {
        type: Map,
        of: userIdSchema
    }
});

const ApiKeyModel = model('ApiKey', UserApiKeysSchema);

export default ApiKeyModel;