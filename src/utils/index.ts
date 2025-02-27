import { ethers, Wallet } from "ethers";

export const getSigner = () => {
    const privateKey = process.env.ADMIN_PRIVATEKEY;
    if (!privateKey) return null;
    return new Wallet(privateKey)
}

export const sign = async (data: any) => {
    try {
        const signer = getSigner();
        if (!signer) throw new Error("Signer is invalid!");
        let keys = Object.keys(data);
        let values = keys.map(key => data[key]);
        const messageHash = ethers.utils.solidityKeccak256(keys.map(key => typeof key), values);
        const signature = await signer.signMessage(ethers.utils.arrayify(messageHash));
        return signature;
    } catch (error: any) {
        console.log("Error signing: ", error.message);
        return null;
    }
}