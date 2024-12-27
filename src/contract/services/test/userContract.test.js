require("dotenv").config();
const mongoose = require("mongoose");
const dbConnect = require("../../../dbConnect");
const workflowService = require("../workflow");
const { contractWorkflow } = require("../../config");

const userContractService = require("../userContract");
const { prettyJSON } = require("../../utils");

describe('userContract test', () => {
    let userContract;
    beforeAll(async () => {
        await dbConnect("testdb-usercontract-12-15");
        await workflowService.add(contractWorkflow);
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    it("should create user contract", async () => {
        const userAddress = "0x123";
        const initMessage = "I want to create a staking contract";

        console.log("create user contract")

        userContract = await userContractService.create({ userAddress, initMessage });

        const result = await userContractService.get({ _id: userContract._id });
        console.log("result", prettyJSON(result))
    });

    it("should add message", async () => {
        const _id = userContract._id
        const stepId = 0;
        const content = "my crypto currency";

        const response = await userContractService.addMessage({ _id, stepId, content });
        console.log("response", prettyJSON(response))

        const result = await userContractService.get({ _id: userContract._id });
        console.log("result", prettyJSON(result))
        // expect(result.content).toBe("my crypto currency");
    });

});