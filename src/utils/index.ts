import { ethers, Wallet } from "ethers";

export const getSigner = () => {
    const privateKey = process.env.ADMIN_PRIVATEKEY;
    if (!privateKey) return null;
    return new Wallet(privateKey)
}

export const sign = async (data: any, onlySign: boolean = true) => {
    try {
        const signer = getSigner();
        if (!signer) throw new Error("Signer is invalid!");
        const messageHash = ethers.utils.solidityKeccak256(data.types, data.values);
        const signature = await signer.signMessage(ethers.utils.arrayify(messageHash));

        const encodedData = ethers.utils.defaultAbiCoder.encode([...data.types, 'bytes'], [...data.values, signature]);
        return onlySign ? signature : encodedData;
    } catch (error: any) {
        console.log("Error signing: ", error.message);
        return null;
    }
}

export const getUpdatedTime = (days: number): number => {
    return Math.floor(Date.now() / 1000) + days * 24 * 60 * 60;
}