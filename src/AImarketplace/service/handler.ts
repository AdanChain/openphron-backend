import { getProvider, getMarketplaceContract } from "../blockchain";
import { blockNumDA } from "../data-access";
import subscriptionService from "./subscription";
import { handleEvent } from "../utils";

const subscriptionHandler = async (tx: SubscriptionTransaction): Promise<void> => {
    try {
        const subscription = {
            user: tx.args.user,
            userContract: tx.args.userContract,
            oracleId: tx.args.oracleId.toString(),
            expire: tx.args.expire,
        };
        const data = await subscriptionService.create(subscription);
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
        id: "subscription",
        event: "Subscribed",
        handler: subscriptionHandler
    });
};

export default handler;
