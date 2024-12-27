require("dotenv").config();
const GEMINI = require("./gemini");

describe('gemini', () => {
    let gemini;
    beforeAll(() => {
        gemini = new GEMINI(process.env.GEMINI_KEY)
    });
    // it("should get gemini", async () => {
    //     const result = await gemini.generateTextFromMessage("I want to build a staking smart contract");
    //     console.log(result);
    //     expect(typeof result).toBe('string');
    // });

    it("should convert to gemini format", async () => {
        const contents = [
            {
                role: "user",
                content: "I want to build a staking smart contract"
            }
        ]
        const result = gemini._convertToGeminiFormat(contents);
        
        expect(result).toEqual([{
            role: "user",
            parts: [{
                text: "I want to build a staking smart contract"
            }]
        }])
    });

    it("should convert to instruction format", async () => {
        const instruction = "you are a requirement analyst, conform requirement with criteria";
        const result = gemini._convertToInstructionFormat(instruction);
        expect(result).toEqual({
            parts: {
                text: instruction
            }
        });
    })
});