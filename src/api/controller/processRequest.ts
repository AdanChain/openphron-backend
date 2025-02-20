import { oracleService, questionService } from "../../AImarketplace/service";

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
        if (!isOwner) throw new Error("You are not owner of this oracle");
        const result = await questionService.update(data);
        return result;
    }
}

export default processRequest;