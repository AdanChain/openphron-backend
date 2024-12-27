import { questionDA } from "../data-access";

const questionService = {
    create: async (data: any) => {
        const { id, oracleId, question, answer } = data;
        const questionData = await questionDA.create({
            id,
            oracleId,
            question,
            answer
        })
        return questionData;
    },
    questionsForOracle: async (oracleId: string) => {
        const questionData = await questionDA.find({ oracleId: oracleId })
        return questionData;
    },
    update: async (data: any) => {
        const { id, oracleId, question, answer } = data;
        const questionData = await questionDA.update({ id: id }, {
            id,
            oracleId,
            question,
            answer
        })
        return questionData;
    },

    getById: async (id: string) => {
        const questionData = await questionDA.findOne({ id: id })
        return questionData;
    },
    gets: async () => {
        const questionData = await questionDA.find({})
        return questionData;
    },
}

export default questionService;