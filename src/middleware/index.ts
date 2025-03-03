import { ethers } from "ethers";
import { apiKeyService } from "../api/service";
import { adminAddressDA } from "../contract/data-access";

export const verifySignatureMiddleware = (req: any, res: any, next: any) => {
    try {
        const authentication = req.headers.authentication;
        if (!authentication) {
            throw new Error("No authentication header found!");
        }
        const { signature, message, address } = JSON.parse(authentication);
        const recoveredAddress = ethers.utils.verifyMessage(message, signature);
        if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
            throw new Error("Invalid signature!");
        }
        req.user = address;
        next();
    } catch (error: any) {
        res.status(401).json({ verifyError: error.message });
    }
};

export const verifyAdmin = async (req: any, res: any, next: any) => {
    try {
        const address = req.user;
        const defaultAdminAddress = process.env.ADMIN_ADDRESS;
        const adminAddressData = await adminAddressDA.finds();
        const adminAddresses = adminAddressData.map((address: any) => address.adminAddress);
        adminAddresses.push(defaultAdminAddress)

        if (!adminAddresses.includes(address)) {
            throw new Error("Invalid admin Fsignature!");
        }
        next();
    } catch (error: any) {
        res.status(403).json({ error: error.message });
    }
};

export const verifyApiKeyMiddleware = async (req: any, res: any, next: any) => {
    try {
        const { apiKey } = req.query;
        const address = req.headers.authentication;
        if (!apiKey || !address) {
            return res.status(401).json({ success: false, error: 'Authentication required' });
        }
        const apiKeyData = await apiKeyService.availableApiKey(apiKey, address);
        if (!apiKeyData) {
            return res.status(401).json({ success: false, error: 'Invalid API key' });
        }
        req.apiKey = apiKey;
        req.user = address;
        next();
        return;
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateFeedsMiddleware = async (req: any, res: any, next: any) => {
    try {

    } catch (error: any) {
        res.json({ error: error.message })
        console.log("Error updating Feeds: ", error.message)
    }
}