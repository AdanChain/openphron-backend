import { contractWorkflow } from "../config";
import { workflowService } from "../services";
import { Request, Response } from "express";


const workflowContoller = {
    initConfig: async () => {
        await workflowService.add(contractWorkflow);
    },
    getWorkflows: async (req: Request, res: Response) => {
        const result = await workflowService.gets();
        res.json(result);
    },
    getWorkflowById: async (req: any, res: Response) => {
        const { id }: { id: number } = req.params;
        const result = await workflowService.getById(id);
        res.json(result);
    }
}

export default workflowContoller;
