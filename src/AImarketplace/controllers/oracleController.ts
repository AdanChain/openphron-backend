import { oracleService } from "../service";
import { Request, Response } from "express";

const oracleController = {
    create: async (req: any, res: any) => {
        try {
            const oracleData = req.body;
            const owner = req.user;
            const oracle = await oracleService.create(oracleData, owner);
            res.status(200).json(oracle);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },
    gets: async (req: Request, res: Response): Promise<void> => {
        try {
            const oracleData = await oracleService.gets();
            // console.log('controller oracle Data ', oracleData)
            res.status(200).json(oracleData);
        } catch (error: any) {
            res.status(500).json({
                message: "Internal server error",
                details: error.message || "Unknown error",
            });
        }
    },
    getById: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const oracleData = await oracleService.getById(id);
            res.status(200).json(oracleData);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },
    rename: async (req: any, res: any) => {
        try {
            const oracleData = req.body;
            const owner = req.user;
            const oracle = await oracleService.rename(oracleData, owner);
            res.status(200).json(oracle);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },
    delete: async (req: any, res: any) => {
        try {
            const { id } =  req.params;
            const oracle = await oracleService.delete(id);
            res.status(200).json(oracle);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default oracleController;