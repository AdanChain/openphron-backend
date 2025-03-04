import { create } from "domain";
import mongoose, { Schema } from "mongoose";

const AdminAddressSchema = new Schema({
   adminAddress:String,
   createdAt: {
    type: Date,
    default: new Date(),
   }
})

const AdminAddress = mongoose.model("adminAddress", AdminAddressSchema);

export default AdminAddress;
