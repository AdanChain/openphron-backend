import { subscriptionDA } from "../data-access";

const subscriptionService = {
    subscribe: async (subscription: any) => {
        try {
            const { user, userContract, oracleId, expire } = subscription;
            const subscribed = await subscriptionDA.findOne({ user, userContract, oracleId })
            console.log('subscribed', subscribed)
            if (!subscribed) {
                const subscriptionData = await subscriptionDA.create({
                    id: user + userContract + oracleId,
                    user,
                    userContract,
                    oracleId,
                    expire
                });
                console.log('subscriptioin_create', subscriptionData)
                return subscriptionData;
            }
            await subscriptionDA.update({ user, userContract, oracleId }, { expire });
            const subscriptionData = await subscriptionDA.findOne({ user, userContract, oracleId })
            return subscriptionData
        } catch (error) {
            console.log('error', error)
        }
    },
    getByUser: async (user: string) => {
        const subscriptionData = await subscriptionDA.find({ user: user });
        return subscriptionData;
    },
    getsByOracle: async (oracleId: string) => {
        const subscriptionData = await subscriptionDA.find({ oracleId: oracleId })
        return subscriptionData;
    }
}

export default subscriptionService;