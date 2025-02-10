import adminService from '../services/adminService';

const adminController = {
    getSystemStats: async (req: any, res: any) => {
        try {
            const stats = await adminService.getSystemStats();
            res.status(200).json(stats);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    getUserUsageData: async (req: any, res: any) => {
        try {
            const usageData = await adminService.getUserUsageData();
            res.status(200).json(usageData);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    getErrorStats: async (req: any, res: any) => {
        try {
            const errorStats = await adminService.getErrorStats();
            res.status(200).json(errorStats);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    getCompileErrors: async (req: any, res: any) => {
        try {
            const { timeRange = 'day' } = req.query;
            const errors = await adminService.getCompileErrors(timeRange);
            res.status(200).json(errors);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    getTestErrors: async (req: any, res: any) => {
        try {
            const { timeRange = 'day' } = req.query;
            const errors = await adminService.getTestErrors(timeRange);
            res.status(200).json(errors);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    suspendUser: async (req: any, res: any) => {
        try {
            const { address } = req.body;
            if (!address) {
                return res.status(400).json({ error: 'Address is required' });
            }
            // TODO: Implement user suspension logic
            res.status(200).json({ message: 'User suspended successfully' });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    extendUserSubscription: async (req: any, res: any) => {
        try {
            const { address, days } = req.body;
            if (!address || !days) {
                return res.status(400).json({ error: 'Address and days are required' });
            }
            // TODO: Implement subscription extension logic
            res.status(200).json({ message: 'Subscription extended successfully' });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    addUserTokens: async (req: any, res: any) => {
        try {
            const { address, amount } = req.body;
            if (!address || !amount) {
                return res.status(400).json({ error: 'Address and amount are required' });
            }
            // TODO: Implement token addition logic
            res.status(200).json({ message: 'Tokens added successfully' });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default adminController; 