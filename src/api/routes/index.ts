import express from 'express';
import { verifyApiKeyMiddleware } from '../../middleware';
const apiRouter = express.Router();

apiRouter.post(`/`, verifyApiKeyMiddleware, (req: any, res: any) => {
    const { apiKey } = req.query;
    res.status(200).json({ message: 'API key verified ' + apiKey });
});

export default apiRouter;