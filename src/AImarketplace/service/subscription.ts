import { sign } from "../../utils";
import { oracleDA, subscriptionDA } from "../data-access";

const subscriptionService = {
    subscribe: async (subscription: any) => {
        try {
            const { user, userContract, oracleId } = subscription;
            const subscribed = await subscriptionDA.findOne({ user, userContract, oracleId })
            console.log('subscribed', subscribed);
            const oracle = await oracleDA.findOne({ id: oracleId });
            const expire = subscriptionService.getExpireTime(30);
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
                oracleId,
                userContract,
                price: oracle.subscriptionPrice,
                expire,
                owner: oracle.owner
            });
            const data = {
                oracleId,
                userContract,
                price: oracle.subscriptionPrice,
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
    },
    getExpireTime: (days: number): number => {
        return Math.floor(Date.now() / 1000) + days * 24 * 60 * 60;
    }
}

export default subscriptionService;