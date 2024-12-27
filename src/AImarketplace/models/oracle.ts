import mongoose from "mongoose";

const OracleSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    subscriptionPrice: String,
    owner: String
})

const OracleModel = mongoose.model("oracles", OracleSchema);

export default OracleModel