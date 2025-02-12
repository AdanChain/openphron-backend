import BaseDataAccess from "./baseDataAccess";

class DeployedContractsDA extends BaseDataAccess {
  constructor(dbModel: any) {
    super(dbModel);
  }

  async countContracts(): Promise<any> {
    const totalContracts = await this.countDocuments();

    return totalContracts;
  }
}

export default DeployedContractsDA;
