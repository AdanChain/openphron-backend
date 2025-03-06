import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './dbConnect';
import routers from './routers';
import workflowController from './contract/controllers/workflow';
import { eventHandler } from './AImarketplace/service';
import apiRouter from './api/routes';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

const PORT = process.env.PORT;
const OPENPHRON_UPDATEDATA_URL = process.env.OPENPHRON_UPDATEDATA_URL;
const OPENPHRON_UPDATEFEEDS_URL = process.env.OPENPHRON_UPDATEFEEDS_URL;

const main = async () => {
    try {
        await dbConnect();

        eventHandler();

        await workflowController.initConfig();

        app.use("/api", routers);
        app.use(`/${OPENPHRON_UPDATEDATA_URL}`, apiRouter);

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
        });
    } catch (error: any) {
        console.error('Error starting the server:', error.message);
        process.exit(1);
    }
};

main();