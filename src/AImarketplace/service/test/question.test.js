require("dotenv").config();
const mongoose = require("mongoose");
const dbConnect = require("../../../mongodb");
const { questionService } = require("..");

describe('question test', () => {
    beforeAll(async () => {
        await dbConnect();
    });
    afterAll(async () => {
        await mongoose.connection.dropDatabase();;
        await mongoose.connection.close();
    });
    it('create', async () => {
        const question = await questionService.create({
            id: "1",
            oracleId: "1",
            question: "test",
            answer: "test",
        });
        expect(question).toMatchObject({
            id: "1",
            oracleId: "1",
            question: "test",
            answer: "test",
        });
    });
    it('create', async () => {
        const question = await questionService.create({
            id: "2",
            oracleId: "1",
            question: "test2",
            answer: "test2",
        });
        expect(question).toMatchObject({
            id: "2",
            oracleId: "1",
            question: "test2",
            answer: "test2",
        });
    });
    it('questionsForOracle', async () => {
        const questionData = await questionService.questionsForOracle(
            "1"
        );
        expect(questionData.length).toBe(2);
    });
    it('update', async () => {
        await questionService.update(
            {
                id: "1",
                oracleId: "1",
                question: "update",
                answer: "update",
            }
        );
        const updatedQuestion = await questionService.getById("1");
        expect(updatedQuestion.question).toBe("update");
    });
    it('gets', async () => {
        const questionData = await questionService.gets();
        expect(questionData.length).toBe(2);
    });
    it('getById', async () => {
        const questionData = await questionService.getById("1");
        expect(questionData.question).toBe("update");
    });
});