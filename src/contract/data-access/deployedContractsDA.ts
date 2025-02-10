import BaseDataAccess from "./baseDataAccess";

class DeployedContractsDA extends BaseDataAccess {
  constructor(dbModel: any) {
    super(dbModel);
  }

  async addContract(data: {
    contractAddress: string;
    userAddress: string;
  }): Promise<any> {
    const { contractAddress, userAddress } = data;
    const userContract = await this.create({
      userAddress,
      contractAddress,
    });

    return;
  }
}

export default DeployedContractsDA;
