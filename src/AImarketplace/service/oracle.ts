import { oracleDA } from "../data-access";

const oracleService = {
    create: async (oracle: Oracle) => {
        const { id, name, description, subscriptionPrice, owner } = oracle;
        const oracleData = await oracleDA.create({
            id,
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