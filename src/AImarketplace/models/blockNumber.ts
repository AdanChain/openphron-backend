import mongoose from "mongoose";

const BlockNumberSchema = new mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    latestBlock: {
        type: Number,
        require: true
    }
})

const BlockNumberModel = mongoose.model("blockNumbers", BlockNumberSchema);

export default BlockNumberModel