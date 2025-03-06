import { getUpdatedTime } from "../../utils";
import { questionDA } from "../data-access";
import { v4 as uuidv4 } from 'uuid';

const questionService = {
    create: async (data: any) => {
        const { oracleId, question, answer } = data;
        const allQuestions = await questionDA.finds();
        const newId = allQuestions.length === 0 ? 1 : allQuestions[allQuestions.length - 1].id * 1 + 1;

        const questionData = await questionDA.create({
            id: newId.toString(),
            oracleId,
            question,
            answer,
            updatedAt: getUpdatedTime(0)
        })
        return questionData;
    },
    questionsForOracle: async (oracleId: string) => {
        const questionData = await questionDA.finds({ oracleId: oracleId })
        return questionData;
    },
    update: async (data: any) => {
        const { id, oracleId, question, answer, updatedAt = getUpdatedTime(0) } = data;
        const questionData = await questionDA.update({ id: id }, {
            id,
            oracleId,
            question,
            answer,
            updatedAt
        })
        return questionData;
    },

    getById: async (id: string) => {
        const questionData = await questionDA.findOne({ id: id })
        return questionData;
    },
    gets: async () => {
        const questionData = await questionDA.finds({})
        return questionData;
    },

    isExist: async (data: any) => {
        const { oracleId, id } = data;
        const questionData = await questionDA.findOne({ oracleId, id })
        return questionData ? true : false;
    }
}

export default questionService;