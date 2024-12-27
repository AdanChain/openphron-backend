import { getProvider, getMarketplaceContract } from "../blockchain";
import { blockNumDA } from "../data-access";
import oracleService from "./oracle";
import questionService from "./question";
import subscriptionService from "./subscription";
import { handleEvent } from "../utils";
import { BigNumber, ethers } from "ethers";

const oracleHandler = async (tx: OracleTransaction): Promise<void> => {
    const subscriptionPrice = BigNumber.from(tx.args.subscriptionPrice);
    const oracle = {
        id: tx.args.oracleId,
        name: tx.args.name,
        description: tx.args.description,
        subscriptionPrice: ethers.utils.formatUnits(subscriptionPrice, 18),
        owner: tx.args.owner
    };
    await oracleService.create(oracle);
};

const questionCreateHandler = async (tx: QuestionTransaction): Promise<void> => {
    const question = {
        id: tx.args.questionId,
        oracleId: tx.args.oracleId,
        question: tx.args.question,
        answer: tx.args.answer,
    };
    await questionService.create(question);
};

const questionUpdateHandler = async (tx: QuestionTransaction): Promise<void> => {
    const question = {
        id: tx.args.questionId,
        oracleId: tx.args.oracleId,
        question: tx.args.question,
        answer: tx.args.answer,
    };
    await questionService.update(question);
};

const subscriptionHandler = async (tx: SubscriptionTransaction): Promise<void> => {
    try {
        const subscription = {
            user: tx.args.user,
            userContract: tx.args.userContract,
            oracleId: tx.args.oracleId,
            expire: tx.args.expire,
        };
        const data = await subscriptionService.subscribe(subscription);

    } catch (error) {
        console.log('error', error);
    }
};

const handler = (): void => {
    const marketplaceContract = getMarketplaceContract()
    const baseHandlerParams = {
        provider: getProvider(),
        times: 15 * 1000,
        BlockNumController: blockNumDA,
        contract: marketplaceContract,
    };

    handleEvent({
        ...baseHandlerParams,
        id: "oracle_create",
        event: "OracleCreated",
        handler: oracleHandler
    });

    handleEvent({
        ...baseHandlerParams,
        id: "question_create",
        event: "QuestionAdded",
        handler: questionCreateHandler
    });

    handleEvent({
        ...baseHandlerParams,
        id: "question_update",
        event: "QuestionUpdated",
        handler: questionUpdateHandler
    });

    handleEvent({
        ...baseHandlerParams,
        id: "subscription",
        event: "Subscribed",
        handler: subscriptionHandler
    });
};

export default handler;
