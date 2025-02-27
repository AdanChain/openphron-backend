import mongoose from "mongoose"

const SubscriptionSchema = new mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    user: {
        type: String,
        require: true
    },
    userContract: {
        type: String,
        require: true
    },
    oracleId: {
        type: String,
        require: true
    },
    expire: Number
})

const SubscriptionModel = mongoose.model("subscriptions", SubscriptionSchema);

export default SubscriptionModel