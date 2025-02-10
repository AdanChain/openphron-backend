class BaseDataAccess {
  model: any;

  constructor(model: any) {
    this.model = model;
  }
  async create(data: any) {
    const { id } = data;
    const isExist = await this.findOne({ id: id });
    if (isExist) {
      await this.model.updateOne({ id: id }, data);
      return isExist;
    }
    const newData = new this.model(data);
    const result = await newData.save();
    return result;
  }
  async finds(filter?: any, optionalFilters?: any) {
    const result = await this.model.find(
      filter ? filter : {},
      null,
      optionalFilters ? optionalFilters : {}
    );
    return result;
  }
  async findOne(filter: any) {
    const result = await this.model.findOne(filter);
    return result;
  }
  async update(filter: any, data: any) {
    const result = await this.model.updateOne(filter, data);
    return result;
  }
  async delete(filter: any) {
    const result = await this.model.deleteOne(filter);
    return result;
  }
}

export default BaseDataAccess;
