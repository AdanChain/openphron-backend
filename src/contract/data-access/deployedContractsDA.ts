import BaseDataAccess from "./baseDataAccess";

class DeployedContractsDA extends BaseDataAccess {
  constructor(dbModel: any) {
    super(dbModel);
  }

  async countContracts(filter: any): Promise<any> {
    const totalContracts = await this.countDocuments(filter ? filter : {});

    return totalContracts;
  }
}

export default DeployedContractsDA;
