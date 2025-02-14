import { ethers } from "ethers";
import { apiKeyController } from "../api/controller";
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
        const userAddress = req.user;
        if (!userAddress) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        if (!ADMIN_ADDRESSES.includes(userAddress.toLowerCase())) {
            return res.status(403).json({ error: 'Admin access required' });
        }

        next();
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const verifyApiKeyMiddleware = async (req: any, res: any, next: any) => {
    try {
        const { apiKey } = req.query;
        if (!apiKey) {
            return res.status(401).json({ error: 'API key required' });
        }
        const apiKeyData = await apiKeyService.availableApiKey(apiKey);
        if (!apiKeyData) {
            return res.status(401).json({ error: 'Invalid API key' });
        }
        req.apiKey = apiKeyData;
        next();
        return;
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};