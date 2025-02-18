import express from 'express';
import { verifyApiKeyMiddleware } from '../../middleware';
const apiRouter = express.Router();

apiRouter.post(`/`, verifyApiKeyMiddleware);

export default apiRouter;