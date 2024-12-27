require("dotenv").config();
const mongoose = require("mongoose");
const dbConnect = require("../../../mongodb");
const { oracleService } = require("..");

describe('oracle test', () => {
    beforeAll(async () => {
        await dbConnect("testdb-12-15");
    });
    afterAll(async () => {
        await mongoose.connection.dropDatabase();;
        await mongoose.connection.close();
    });

    it('create', async () => {
        const oracle = await oracleService.create({
            id: "1",
            name: "test",
            description: "test",
            owner: "0x1234567890123456789012345678901234567890",
            subscriptionPrice: 100,
        });

        expect(oracle).toMatchObject({
            id: "1",
            name: "test",
            description: "test",
            owner: "0x1234567890123456789012345678901234567890",
            subscriptionPrice: 100,
        });
    })

    it('getById', async () => {
        const oracle = await oracleService.getById("1");
        expect(oracle.name).toBe("test");
    })

    it('gets', async () => {
        await oracleService.create({
            id: "2",
            name: "test",
            description: "test",
            owner: "0x1234567890123456789012345678901234567890",
            subscriptionPrice: 100,
        });
        const oracles = await oracleService.gets();
        expect(oracles.length).toBe(2);
    })
});