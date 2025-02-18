import { questionService } from "../service";
import { Request, Response } from "express";

const questionController = {

    gets: async (req: Request, res: Response) => {
        try {
            const questionData = await questionService.gets();
            res.status(200).json(questionData);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },
    getById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const questionData = await questionService.getById(id);
            res.status(200).json(questionData);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    questionsForOracle: async (req: Request, res: Response) => {
        try {
            const { oracleId } = req.params;
            const questionData = await questionService.questionsForOracle(oracleId);
            res.status(200).json(questionData);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req: Request, res: Response) => {    
        try {
            const questionData = await questionService.update(req.body);
            res.status(200).json(questionData);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default questionController;