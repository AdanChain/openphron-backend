import adminService from '../services/adminService';

const adminController = {
    getUserState: async (req: any, res: any) => {
        try {
            const stats = await adminService.getUserState();
            res.status(200).json(stats);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    getUserInfo: async (req: any, res: any) => {
        try {
            const usageData = await adminService.getUserInfo();
            res.status(200).json(usageData);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    updateContracts: async (req: any, res: any) => {
        try {
            const errorStats = await adminService.updateContracts();
            res.status(200).json(errorStats);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    addUser: async (req: any, res: any) => {
        try {
            const user = await adminService.addUser(req.body);
            res.status(200).json(user);
        } catch (error: any) {
            res.status(500).json({ error: error.message }); 
        }
    },

    deleteUser: async (req: any, res: any) => {
        try {
            const {address} = req.params;
            const user = await adminService.deleteUser(address);
            res.status(200).json(user);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default adminController; 