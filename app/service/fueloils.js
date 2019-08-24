'use strict';

const Service = require('egg').Service;

class FueloilService extends Service {
  /**
   * 燃油公告
   * @param {Object} params 搜索参数
   */
  async search(params) {
    const { model } = this.ctx;
    const fueloils = await model.Fueloils.findAndCount({
      limit: 10,
      offset: (params.page - 1) * 10,
    });
    return fueloils;
  }

  /**
   * 获取燃油公告信息
   * @param {*} productModel model
   */
  async get(productModel) {
    const { model } = this.ctx;
    const fueloil = await model.Fueloils.findOne({ where: { product_model: productModel }, raw: true });
    return fueloil;
  }
}

module.exports = FueloilService;
