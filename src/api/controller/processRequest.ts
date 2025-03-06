import { types } from "util";
import { oracleService, questionService } from "../../AImarketplace/service";
import { sign } from "../../utils";

const processRequest = {
    classify: async (req: any, res: any) => {
        try {
            const address = req.user;
            const { contents } = req.body;

            const results = await Promise.all(
                contents.map(async (content: any) => {
                    const { updateType, description } = content;
                    switch (updateType) {
                        case "question":
                            return await processRequest.question(address, description);
                        case "oracle":
                            return await processRequest.oracle(address, description);
                        default:
                            return null;
                    }
                }));

            res.json({ success: true, results });
        } catch (error: any) {
            res.json({ success: false, error: error.message });
        }
    },
    question: async (address: string, data: any) => {
        const isOwner = await oracleService.isOwnerById(data.oracleId, address);
        if (!isOwner) throw new Error("You are not owner of this oracle!");
        const isExist = await questionService.isExist(data);
        if (!isExist) {
            console.log("create")
            const result = await questionService.create(data);
            return result;
        };
        const result = await questionService.update(data);
        return result;
    },
    oracle: async (address: string, data: any) => {
        const result = await oracleService.create(data, address);
        return result;
    },
    updateFeeds: async (req: any, res: any) => {
        try {
            const { questionId } = req.params;
            if (!questionId) throw new Error("QuestionId is not found!");
            const data = await questionService.getById(questionId);
            if (!data) throw new Error("Question is not found!");
            const encodedData = await sign({
                types: ['uint256', 'uint256', 'string', 'uint256'],
                values: [Number(data.id), Number(data.oracleId), data.answer, data.updatedAt]
            }, false)
            res.json(encodedData)
        } catch (error: any) {
            res.json({ success: false, error: error.message })
        }
    }
}

export default processRequest;