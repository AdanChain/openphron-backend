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
    }
})

const QuestionModel = mongoose.model("questions", QuestionSchema);
export default QuestionModel