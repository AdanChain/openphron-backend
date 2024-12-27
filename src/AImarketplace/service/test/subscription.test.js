require("dotenv").config();
const mongoose = require("mongoose");
const dbConnect = require("../../../mongodb");
const { subscriptionService } = require("..");

describe('subscription test', () => {
    beforeAll(async () => {
        await dbConnect("testdb-12-15");
    });
    afterAll(async () => {
        await mongoose.connection.dropDatabase();;
        await mongoose.connection.close();
    });

    it('subscribe1', async () => {
        const subscription = await subscriptionService.subscribe({
            user: "0x1234567890123456789012345678901234567890",
            userContract: "0x1234567890123456789012345678901234567890",
            oracleId: "1",
            expire: "1234567890",
        });

        expect(subscription).toMatchObject(
            {
                user: "0x1234567890123456789012345678901234567890",
                userContract: "0x1234567890123456789012345678901234567890",
                oracleId: "1",
                expire: "1234567890",
            }
        );
    });

    it('subscribe2', async () => {
        const subscription = await subscriptionService.subscribe({
            user: "0x1234567890123456789012345678901234567890",
            userContract: "0x1234567890123456789012345678901234567890",
            oracleId: "1",
            expire: "156666666",
        });

        expect(subscription).toMatchObject({
            user: "0x1234567890123456789012345678901234567890",
            userContract: "0x1234567890123456789012345678901234567890",
            oracleId: "1",
            expire: "156666666",
        });
    });

    it('getByUser', async () => {
        const subscriptions = await subscriptionService.getByUser(
            "0x1234567890123456789012345678901234567890"
        );
        expect(subscriptions.length).toBe(1);
    });

    it('getsByOracle', async () => {
        const subscriptions = await subscriptionService.getsByOracle(
            "1"
        );
        expect(subscriptions.length).toBe(1);
    });
});