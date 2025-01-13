require("dotenv").config();
const mongoose = require("mongoose");
const dbConnect = require("../../../dbConnect");
const workflowService = require("../workflow");
const { contractWorkflow } = require("../../config");

describe('workflow', () => {
    beforeAll(async () => {
        await dbConnect();
    });
    afterAll(async () => {
        await mongoose.connection.dropDatabase();;
        await mongoose.connection.close();
    });

    it("should add workflow", async () => {
        await workflowService.add(contractWorkflow);
    });

    it("should get workflow", async () => {
        const result = await workflowService.gets();
        expect(result.length).toBe(1);
    });

    it("should get workflow by id", async () => {
        const result = await workflowService.getById("1");
        expect(result.id).toBe("1");
    });
});