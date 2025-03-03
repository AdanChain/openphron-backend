import { adminAddressDA, costDA, deployedContractsDA, shareContractsDA, userContractsDA } from "../../contract/data-access";
import { BlockNumberModel } from "../../AImarketplace/models";
import userContractDA from "../../contract/data-access/userContractDA";
import { apiKeyDA } from "../../api/data-access";
import { create } from "domain";

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

    getApiKeys:async() => {
        try {
            const apiKeys = await apiKeyDA.finds();
            return apiKeys.map((apiKey: any) => ({
                id: apiKey._id,
                address: apiKey.userId,
                name: apiKey.name,
                apiKey: apiKey.apiKey,
                status: apiKey.status,
                createdAt: apiKey.createdAt,
            }));
        } catch (error: any) {
            throw new Error(`Error getting api keys: ${error.message}`);
        }
    },
    getAdminAddress: async () => {
        try {
            const adminAddress = await adminAddressDA.finds();
            return adminAddress.map((address: any) => ({
                id: address._id,
                address: address.adminAddress,
                createdAt:address.createdAt             
            }));
        } catch (error: any) {
            throw new Error(`Error getting admin address: ${error.message}`);
        }
    },

    getDeployedContracts:async() => {
        try {
            const contracts = await deployedContractsDA.finds();
            return contracts.map((contract: any) => ({
                id: contract._id,
                userAddress: contract.userAddress,
                contractAddress: contract.address,
                chainId: contract.chainId,
                abi: [...contract.abi],
                contractId:contract.contractId,
                createdAt:contract.createdAt,
                contractName:""
            }));
        } catch (error: any) {
            throw new Error(`Error getting deployed contracts: ${error.message}`);
        }
    },

    updateContracts: async () => {
        try {
            const contracts = await userContractsDA.finds();
            return contracts.map((contract: any) => ({
                id: contract._id,
                contractId:contract.id,
                compileError: [...contract.compileError],
                testError: [...contract.testError],
                name: contract.name,
                address: contract.userAddress,
                createdAt: contract.createdAt,
                steps: [...contract.steps],
                status:0,
                access_token:"",
                sharedAt:"",
            }));
        } catch (error: any) {
            throw new Error(`Error getting error logs: ${error.message}`);
        }
    },

    getSharedContracts:async () => {
        try {
            const sharedContracts = await shareContractsDA.finds();
            return sharedContracts.map((contract: any) => ({
                id: contract.id,
                address: contract.userAddress,
                sharedAt: contract.sharedAt,
                expiresAt: contract.expiresAt,
                access_token: contract.access_token,
                public: contract.public,
            }));
        } catch (error: any) {
            throw new Error(`Error getting error share: ${error.message}`);
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
    addAdminAddress: async (address: string) => {
        try {
            const result = await adminAddressDA.addAddress(address);
            return result;
        } catch (error: any) {
            throw new Error(`Error adding admin address: ${error.message}`);
        }
    },
    
    deleteUser: async (address: string) => {
        try {
            const result = await costDA.deleteUser(address);
            return result;
        } catch (error: any) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    },

    deleteAdminAddress: async (address: string) => {
        try {
            const data = {adminAddress:address}
            const result = await adminAddressDA.delete(data);
            console.log("result",result);
            return result;
        } catch (error: any) {
            throw new Error(`Error deleting admin address: ${error.message}`);
        }
    },

    deleteError: async (id: string, errorId: string, errorType: string) => {
        try {
            const result = await userContractsDA.deleteError(id, errorId, errorType);
            return result;
        } catch (error: any) {
            throw new Error(`Error deleting error: ${error.message}`);
        }
    }
};
// Helper function to get most common error
export default adminService; 