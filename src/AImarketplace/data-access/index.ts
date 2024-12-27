import { OracleModel, QuestionModel, SubscriptionModel, BlockNumberModel } from "../models";
import BaseBaseDataAccess from "./basic";

const oracleDA = new BaseBaseDataAccess(OracleModel)
const questionDA = new BaseBaseDataAccess(QuestionModel)
const subscriptionDA = new BaseBaseDataAccess(SubscriptionModel)
const blockNumDA = new BaseBaseDataAccess(BlockNumberModel)

export {
    oracleDA,
    questionDA,
    subscriptionDA,
    blockNumDA
}