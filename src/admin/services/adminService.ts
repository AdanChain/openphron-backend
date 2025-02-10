import { costDA } from "../../contract/data-access";
import { BlockNumberModel } from "../../AImarketplace/models";

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
    getSystemStats: async () => {
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
            const blockNumbers = await BlockNumberModel.find({});

            return {
                userStats: {
                    totalUsers,
                    activeUsers,
                    totalTokensUsed
                },
                blockchainStats: {
                    blockNumbers
                }
            };
        } catch (error: any) {
            throw new Error(`Error getting system stats: ${error.message}`);
        }
    },

    // Get detailed user usage data
    getUserUsageData: async () => {
        try {
            const users: User[] = await costDA.finds();
            return users.map((user: User) => ({
                address: user.userAddress,
                remainingTokens: user.remainingTokens,
                remainingDays: user.remainingDays,
                tokenUsage: process.env.TOKEN_LIMIT ? 
                    Number(process.env.TOKEN_LIMIT) - user.remainingTokens : 
                    100000 - user.remainingTokens
            }));
        } catch (error: any) {
            throw new Error(`Error getting user usage data: ${error.message}`);
        }
    },

    // Get error logs (from the last 24 hours)
    getErrorLogs: async () => {
        try {
            // This is a placeholder - you'll need to implement proper error logging
            // Consider using a logging service or database table for errors
            return [];
        } catch (error: any) {
            throw new Error(`Error getting error logs: ${error.message}`);
        }
    },

    // Get compile errors
    getCompileErrors: async (timeRange: 'day' | 'week' | 'month' = 'day') => {
        try {
            const now = new Date();
            let startDate = new Date();
            
            switch(timeRange) {
                case 'week':
                    startDate.setDate(now.getDate() - 7);
                    break;
                case 'month':
                    startDate.setMonth(now.getMonth() - 1);
                    break;
                default:
                    startDate.setDate(now.getDate() - 1);
            }

            // TODO: Replace with actual DB query once error logging is implemented
            const compileErrors: CompileError[] = [];
            return compileErrors;
        } catch (error: any) {
            throw new Error(`Error getting compile errors: ${error.message}`);
        }
    },

    // Get test errors
    getTestErrors: async (timeRange: 'day' | 'week' | 'month' = 'day') => {
        try {
            const now = new Date();
            let startDate = new Date();
            
            switch(timeRange) {
                case 'week':
                    startDate.setDate(now.getDate() - 7);
                    break;
                case 'month':
                    startDate.setMonth(now.getMonth() - 1);
                    break;
                default:
                    startDate.setDate(now.getDate() - 1);
            }

            // TODO: Replace with actual DB query once error logging is implemented
            const testErrors: TestError[] = [];
            return testErrors;
        } catch (error: any) {
            throw new Error(`Error getting test errors: ${error.message}`);
        }
    },

    // Get error statistics
    getErrorStats: async () => {
        try {
            const dayCompileErrors = await adminService.getCompileErrors('day');
            const dayTestErrors = await adminService.getTestErrors('day');
            const weekCompileErrors = await adminService.getCompileErrors('week');
            const weekTestErrors = await adminService.getTestErrors('week');

            return {
                today: {
                    compileErrors: dayCompileErrors.length,
                    testErrors: dayTestErrors.length,
                    total: dayCompileErrors.length + dayTestErrors.length
                },
                week: {
                    compileErrors: weekCompileErrors.length,
                    testErrors: weekTestErrors.length,
                    total: weekCompileErrors.length + weekTestErrors.length
                },
                mostCommonCompileError: getMostCommonError(dayCompileErrors),
                mostCommonTestError: getMostCommonError(dayTestErrors)
            };
        } catch (error: any) {
            throw new Error(`Error getting error statistics: ${error.message}`);
        }
    }
};

// Helper function to get most common error
function getMostCommonError(errors: (CompileError | TestError)[]) {
    if (errors.length === 0) return null;

    const errorCounts = errors.reduce((acc, error) => {
        const message = error.message;
        acc[message] = (acc[message] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const mostCommon = Object.entries(errorCounts)
        .sort(([,a], [,b]) => b - a)[0];

    return {
        message: mostCommon[0],
        count: mostCommon[1]
    };
}

export default adminService; 