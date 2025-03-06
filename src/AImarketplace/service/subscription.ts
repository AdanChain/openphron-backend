import { getUpdatedTime, sign } from "../../utils";
import { oracleDA, subscriptionDA } from "../data-access";
import { v4 as uuidv4 } from 'uuid';

const subscriptionService = {
    create: async (subscription: any )=> {
        try {
            const { user, userContract, oracleId, expire } = subscription;
            const newData = {
                id: uuidv4(),
                user, userContract, oracleId, expire,
            }
            await subscriptionDA.create(newData);
            return newData;
        } catch (error: any) {
            console.log('Error creating subscription: ', error.message);
        }
    },
    subscribe: async (subscription: any) => {
        try {
            const { user, userContract, oracleId } = subscription;
            const subscribed = await subscriptionDA.findOne({ user, userContract, oracleId })
            console.log('subscribed', subscribed);
            const oracle = await oracleDA.findOne({ id: oracleId });
            const expire = getUpdatedTime(30);
            const signature = await sign({
                types: ['uint256', 'address', 'uint256', 'uint256', 'address'],
                values: [Number(oracleId), userContract, Number(oracle.subscriptionPrice) * 1e18, expire, oracle.owner]
            });
            const data = {
                oracleId: Number(oracleId),
                userContract,
                price: Number(oracle.subscriptionPrice) * 1e18,
                expire,
                owner: oracle.owner,
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