import mongoose, { Schema } from "mongoose";

const AssistorSchema = new Schema({
    name: String,
    instruction: String,
    result_instruction: String,
    minChatCount: {
        type: Number,
        default: 0
    },
    isAuto: Boolean,
    action: Boolean
})

const ParametersSchema = new Schema({
    contractNode: Number,
    testNode: Number
})

const WorkflowSchema = new Schema({
    id: String,
    name: String,
    descrition: String,
    assistors: [AssistorSchema],
    parameters: ParametersSchema
})



const Workflows = mongoose.model("workflows", WorkflowSchema);

export default Workflows;
