import mongoose from "mongoose"

const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        require: true
    },
    answer: {
        type: String,
        require: true
    },
    oracleId: {
        type: String,
        require: true
    },
    id: {
        type: String,
        require: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const QuestionModel = mongoose.model("questions", QuestionSchema);
export default QuestionModel