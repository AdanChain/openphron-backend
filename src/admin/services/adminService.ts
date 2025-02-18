import { costDA, userContractsDA } from "../../contract/data-access";
import { BlockNumberModel } from "../../AImarketplace/models";
import userContractDA from "../../contract/data-access/userContractDA";

interface User {
    userAddress: string;
    remainingTokens: number;
    remainingDays: number;
}

interface CompileError {
    timestamp: Date;
    contractId: string;
    userAddress: string;
    message: string;
    code: string;
}

interface TestError {
    timestamp: Date;
    contractId: string;
    userAddress: string;
    testName: string;
    message: string;
    expected: string;
    actual: string;
}

const adminService = {
    // Get system usage statistics
    getUserState: async () => {
        try {
            // Get token usage stats
            const users: User[] = await costDA.finds();
            const totalUsers = users.length;
            const activeUsers = users.filter((user: User) => user.remainingDays > 0).length;
            const totalTokensUsed = users.reduce((acc: number, user: User) => {
                const maxTokens = Number(process.env.TOKEN_LIMIT);
                const used = maxTokens - user.remainingTokens;
                return acc + used;
            }, 0);

            // Get latest block numbers for monitoring
            return {
                totalUsers,
                activeUsers,
                totalTokensUsed
            };
        } catch (error: any) {
            throw new Error(`Error getting system stats: ${error.message}`);
        }
    },

    // Get detailed user usage data
    getUserInfo: async () => {
        try {
            const users: User[] = await costDA.finds();
            return users.map((user: User) => ({
                address: user.userAddress,
                remainingTokens: user.remainingTokens,
                remainingDays: user.remainingDays
            }));
        } catch (error: any) {
            throw new Error(`Error getting user usage data: ${error.message}`);
        }
    },

    // Get error logs (from the last 24 hours)
    updateContracts: async () => {
        try {
            const contracts = await userContractsDA.finds();
            return contracts.map((contract: any) => ({
                id: contract._id,
                compileError: [...contract.compileError],
                testError: [...contract.testError],
                name: contract.name,
                address: contract.userAddress,
                createdAt: contract.createdAt,
                steps: [...contract.steps]
            }));
        } catch (error: any) {
            throw new Error(`Error getting error logs: ${error.message}`);
        }
    },

    addUser: async (user: any) => {
        try {
            const result = await costDA.addUser(user);
            return result;
        } catch (error: any) {
            throw new Error(`Error adding user: ${error.message}`);
        }
    },
    
    deleteUser: async (address: string) => {
        try {
            const result = await costDA.deleteUser(address);
            return result;
        } catch (error: any) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }
};
// Helper function to get most common error
export default adminService; 