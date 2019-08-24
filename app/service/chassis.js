'use strict';

const Service = require('egg').Service;

class ChassisService extends Service {
  /**
   * 搜索底盘公告
   * @param {Object} params 搜索参数
   */
  async search(params) {
    const { model } = this.ctx;
    const chassis = await model.Chassis.findAndCountAll({
      limit: 10,
      offset: (params.page - 1) * 10,
    });
    return chassis;
  }

  /**
   * 获取公告信息
   * @param {*} key 公告key
   */
  async get(key) {
    const { model } = this.ctx;
    const chasse = await model.Chassis.findOne({ where: { key }, raw: true });
    return chasse;
  }
}

module.exports = ChassisService;
