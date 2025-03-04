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

    getApiKeys: async (req: any, res: any) => {
        try {
            const apiKeys = await adminService.getApiKeys();
            res.status(200).json(apiKeys);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },
    getAdminAddress: async (req: any, res: any) => {
        try {
            const adminAddress = await adminService.getAdminAddress();
            res.status(200).json(adminAddress);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    getDeployedContracts:async (req: any, res: any) => {
        try {
            const contracts = await adminService.getDeployedContracts();
            res.status(200).json(contracts);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },
    
    getSharedContracts: async (req: any, res: any) => {
        try {
            const contracts = await adminService.getSharedContracts();
            res.status(200).json(contracts);
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

    addAdminAddress: async (req: any, res: any) => {
        try {
            const {address} = req.body;
            console.log(address);
            const adminAddress = await adminService.addAdminAddress(address);
            res.status(200).json(adminAddress);
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
    },

    deleteError: async (req: any, res: any) => {
        try {
            const {contractId,errorId,errorType} = req.body;
            const error = await adminService.deleteError(contractId,errorId,errorType);
            res.json(error);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
            
        }
    },

    deleteAdminAddress: async (req: any, res: any) => {
        try {
            const {address} = req.params;
            const adminAddress = await adminService.deleteAdminAddress(address);
            res.status(200).json(adminAddress);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default adminController; 