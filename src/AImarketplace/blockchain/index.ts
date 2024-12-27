import { ethers } from "ethers";
import addresses from "./contracts/addresses.json";
import oracleMarketPlace from "./contracts/OracleMarketplace.json";
import dotenv from "dotenv";

dotenv.config();

// Function to get the provider
const getProvider = () => {
    if (!process.env.RPC_URL) {
        throw new Error('RPC_URL is not defined in .env file.');
    }
    return new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
};

// Check if contract address and ABI are valid
if (!addresses.ORACLEMARKETPLACE) {
    throw new Error("Oracle marketplace contract address is missing in addresses.json");
}
if (!oracleMarketPlace.abi || !Array.isArray(oracleMarketPlace.abi) || oracleMarketPlace.abi.length === 0) {
    throw new Error("Oracle marketplace ABI is missing or invalid in OracleMarketplace.json");
}

// Lazy initialization of the marketplace contract
const getMarketplaceContract = () => {
    const provider = getProvider();
    return new ethers.Contract(
        addresses.ORACLEMARKETPLACE,
        oracleMarketPlace.abi,
        provider
    );
};

export {
    getProvider,
    getMarketplaceContract
};
