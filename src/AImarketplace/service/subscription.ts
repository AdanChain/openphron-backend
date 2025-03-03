import { getUpdatedTime, sign } from "../../utils";
import { oracleDA, subscriptionDA } from "../data-access";

const subscriptionService = {
    subscribe: async (subscription: any) => {
        try {
            const { user, userContract, oracleId } = subscription;
            const subscribed = await subscriptionDA.findOne({ user, userContract, oracleId })
            console.log('subscribed', subscribed);
            const oracle = await oracleDA.findOne({ id: oracleId });
            const expire = getUpdatedTime(30);
            // let subscriptionData;
            // if (!subscribed) {
            //     subscriptionData = await subscriptionDA.create({
            //         id: user + userContract + oracleId,
            //         user,
            //         userContract,
            //         oracleId,
            //         expire
            //     });
            // } else {
            //     await subscriptionDA.update({ user, userContract, oracleId }, { expire });
            //     subscriptionData = await subscriptionDA.findOne({ user, userContract, oracleId })
            // }
            const signature = await sign({
                types: ['string', 'address', 'uint256', 'uint256', 'address'],
                values: [oracleId, userContract, Number(oracle.subscriptionPrice), expire, oracle.owner]
            });
            const data = {
                oracleId: oracleId,
                userContract,
                price: Number(oracle.subscriptionPrice),
                expire,
                ower: oracle.owner,
                signature
            }
            return data;
        } catch (error) {
            console.log('error', error)
        }
    },
    getByUser: async (user: string) => {
        const subscriptionData = await subscriptionDA.finds({ user: user });
        return subscriptionData;
    },
    getsByOracle: async (oracleId: string) => {
        const subscriptionData = await subscriptionDA.finds({ oracleId: oracleId })
        return subscriptionData;
    }
}

export default subscriptionService;