import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './dbConnect';
import routers from './routers';
import workflowController from './contract/controllers/workflow';
import { eventHandler } from './AImarketplace/service';

dotenv.config();
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const PORT = process.env.PORT;

const main = async () => {
    try {
        await dbConnect();

        eventHandler();

        await workflowController.initConfig();

        app.use("/api", routers);

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
        });
    } catch (error: any) {
        console.error('Error starting the server:', error.message);
        process.exit(1);
    }
};

main();
