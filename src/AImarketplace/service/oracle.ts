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
        const oracleData = await oracleDA.find({})
        // console.log('service oracle Data ', oracleData)
        return oracleData;
    }
}

export default oracleService;