import mongoose, { Schema } from "mongoose";

const TokenSchema = new Schema({
   userAddress:String,
   remainingTokens:Number,
   remainingDays:Number,
   lastResetTime:Date
})

const UserToken = mongoose.model("userToken", TokenSchema);

export default UserToken;
