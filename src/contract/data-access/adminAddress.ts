import BaseDataAccess from "./baseDataAccess";

class AdminAddressDA extends BaseDataAccess {
  constructor(dbModel: any) {
    super(dbModel);
  }

  async addAddress(address:any): Promise<any> {
    const isExist = await this.findOne({ adminAddress: address });
    if (isExist) {
      return isExist;
    }
    const newData = new this.model({adminAddress:address});
    const result = await newData.save();
    return result
  }
}



export default AdminAddressDA;
