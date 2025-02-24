import { ethers } from "ethers";
import { apiKeyService } from "../api/service";

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

const ADMIN_ADDRESSES = process.env.ADMIN_ADDRESSES ? process.env.ADMIN_ADDRESSES.split(',') : [];

export const verifyAdmin = async (req: any, res: any, next: any) => {
    try {
        const authentication = req.headers.authentication;
        if (!authentication) {
            throw new Error("No authentication header found!");
        }
        const { address } = JSON.parse(authentication);
        const userAddress = address;
        if (!userAddress) {
            return res.json({ success:false, error: 'Authentication required' });
        }

        if (!ADMIN_ADDRESSES.includes(userAddress)) {
            return res.json({ success:false, error: 'Admin access required' });
        }
        next();
    } catch (error: any) {
        res.json({ error: error.message });
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
        req.apiKey = apiKeyData;
        req.user = address;
        next();
        return;
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};