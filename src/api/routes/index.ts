import express from 'express';
import { verifyApiKeyMiddleware } from '../../middleware';
import processRequest from '../controller/processRequest';
const apiRouter = express.Router();

apiRouter.post(`/`, verifyApiKeyMiddleware, processRequest.classify);
apiRouter.post('/:questionId',  processRequest.updateFeeds);

export default apiRouter;