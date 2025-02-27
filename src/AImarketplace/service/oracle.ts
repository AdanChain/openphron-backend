import { oracleDA } from "../data-access";
import { v4 as uuidv4 } from 'uuid';

const oracleService = {
    create: async (oracle: Oracle, owner?: string) => {
        const { id, name, description, subscriptionPrice } = oracle;
        // const allOracles = await oracleDA.finds();
        // const newId = allOracles[allOracles.length - 1].id * 1 + 1;
        const oracleData = await oracleDA.create({
            id: id || uuidv4(),
            name,
            description,
            subscriptionPrice,
            owner
        })
        return oracleData;
    },
    getById: async (oracleId: string) => {
        const oracleData = await oracleDA.findOne({ id: oracleId })
        return oracleData;
    },
    gets: async () => {
        const oracleData = await oracleDA.finds({})
        return oracleData;
    },
    isOwnerById: async (oracleId: string, owner: string) => {
        const oracleData = await oracleDA.findOne({ id: oracleId, owner: owner })
        return oracleData ? true : false;
    }
}

export default oracleService;