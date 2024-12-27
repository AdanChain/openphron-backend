require("dotenv").config();
const mongoose = require("mongoose");
const dbConnect = require("../../../dbConnect");
const workflowService = require("../workflow");
const assistorService = require("../assistor");
const { contractWorkflow } = require("../../config");

describe('assistor test', () => {
    beforeAll(async () => {
        await dbConnect("testdb-assistor-12-15");

        await workflowService.add(contractWorkflow);
    });
    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });
    // it("should get name from idea", async () => {
    //     const result = await assistorService.nameFromText("I want to build a staking smart contract");
    //     expect(typeof result).toBe('string');
    // });
    it("should generate text", async () => {
        const result = await assistorService.generateText({
            workflowId: 1,
            stepId: 0,
            history: [
                {
                    role: "user",
                    content: "I want to build a staking smart contract"
                }
            ]
        });
        expect(typeof result).toBe('string');
    });


    it("should generate result", async () => {
        const testChatHistory = [
            {
                role: "user",
                content: "I want to make NFT mint contract"
            },
            {
                role: "model",
                content: ` Okay, let's start gathering requirements for your NFT mint contract.  My first question is:

1. What kind of NFTs will this contract mint ? (e.g., images, videos, audio, 3D models, etc.)  Are there any specific file formats you'll be supporting?`
            },
            {
                role: "user",
                content: `images`
            },
            {
                role: "model",
                content: `Okay, images.My second question is:

2.  Will these NFTs have unique properties or attributes, or will they be largely identical except for a unique ID ? If they have attributes, can you describe them ? For example, are there different rarities, character types, or background elements ?`
            },
            {
                role: "user",
                content: `yes`
            },
            {
                role: "model",
                content: `Okay.My third question is:

3. What blockchain will this contract be deployed on ? (e.g., Ethereum, Polygon, Solana, etc.)  Do you have a preference, or are you open to suggestions based on cost and speed considerations ?

`
            },
            {
                role: "user",
                content: `ethereum`
            },
            {
                role: "model",
                content: `Okay.My fourth question is:

4.  What kind of minting process are you envisioning ? Will it be a public mint(anyone can mint), a whitelist mint(only those on a pre - approved list), a dutch auction, or something else?  What is your desired level of control over the minting process(e.g., setting a fixed price, a time limit, a maximum number of mints per wallet, etc.) ?`
            },
            {
                role: "user",
                content: `pro approved`
            },
            {
                role: "model",
                content: `Okay, here's a draft requirements document based on our conversation so far. Please review it and let me know if anything needs to be changed or added.

Requirements Document: NFT Mint Contract

1. Introduction

This document outlines the requirements for an NFT mint contract designed to mint image - based NFTs.The contract will be deployed on the Ethereum blockchain.

2. NFT Characteristics

    * Type: Image NFTs.
* Attributes:  NFTs will possess unique properties or attributes(further details to be specified).

3. Minting Process

    * Type: Pre - approved(whitelist) minting.
* Control: Further details on controlling the minting process(price, time limits, maximum mints per wallet, etc.) will be added in a subsequent iteration.


4. Blockchain

    * Platform: Ethereum


5. Open Issues

    * Specific details regarding NFT attributes need to be defined.
* Specific controls over the whitelist minting process(price, limits, etc.) need to be defined.



Do you approve this draft, or would you like to add or modify any of the requirements ?`
            }
        ]
        const result = await assistorService.extractResult({
            workflowId: 1,
            stepId: 0,
            history: testChatHistory
        });
        console.log("generated result",result);
        expect(typeof result).toBe('string');
    });
});