import { ethers } from "ethers";

export const verifySignatureMiddleware = (req: any, res: any, next: any) => {
    try {
        const authHeader = req.headers.authentication;
        if (!authHeader) throw new Error("Signature not found!")
        const { signature, message, address } = JSON.parse(authHeader);
        if (!signature || !message || !address) throw new Error("Missing signature, message or address!");

        const recoveredAddress = ethers.utils.verifyMessage(message, signature);
        if (recoveredAddress !== address) throw new Error("Wallet Address is different!");
        req.user = address;
        next();
    } catch (error: any) {
        console.error("Error verifying signature:", error.message);
        res.json({ verifyError: error.message });
    }

}