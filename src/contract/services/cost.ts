import { costDA } from "../data-access"
import cron, { validate } from "node-cron";
import { tokenize } from "../utils";

const costService = {
    subscribeTokens: async (address: string) => {
        const tokenInfo = await costDA.createByAddress(address);
        return { tokenInfo }
    },
    getTokens: async (address: string) => {
        const tokenInfo = await costDA.findOne({ userAddress: address });
        return tokenInfo;
    },
    reduceTokens: async (address: string, message: string) => {
        const { tokenInfo, token } = await costService.validateToken(address, message);
        let remainingTokens = tokenInfo.remainingTokens - Number(token);
        await costDA.update({ userAddress: address }, { remainingTokens: remainingTokens });
        return { remainingTokens };
    },
    validateToken: async (address: string, message: string) => {
        const tokenInfo = await costDA.findOne({ userAddress: address });
        let token = tokenize(message);
        if (!tokenInfo) throw new Error("You must subscribe tokens!");
        if (tokenInfo.remainingTokens < token) throw new Error("Not enough tokens!");
        if (tokenInfo.remainingDays < 0) throw new Error("Subscribe already finished!");

        return { tokenInfo, token };
    },
    resetDailyTokens: async () => {
        const users = await costDA.finds();
        for (const user of users) {
            if (user.remainingDays <= 0) {
                user.remainingTokens = 0; // Reset to 0 tokens
                user.remainingDays = -1; // Reset to -1 days
            } else {
                user.remainingTokens = process.env.TOKEN_LIMIT || 10000; // Reset to 10,000 tokens
                user.remainingDays -= 1; // Decrement remaining days
            }
            await costDA.update({ userAddress: user.userAddress }, user);
        }
        console.log("Daily tokens reset successfully.");
    }
}
cron.schedule("0 0 * * *", costService.resetDailyTokens);

export default costService