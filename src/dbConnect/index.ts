import mongoose from "mongoose";
require("dotenv").config();

const dbConnect = async (dbName: string = process.env.DBNAME || "defaultDB") => {
    try {
        console.log("dbname: ", dbName)
        const BaseURI = "mongodb://127.0.0.1:27017/"
        await mongoose.connect(BaseURI + dbName);
        console.log("Connected to MongoDB");
    } catch (error: any) {
        console.log(error);
    }
}

export default dbConnect;