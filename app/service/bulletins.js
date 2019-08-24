'use strict';

const Service = require('egg').Service;

class BulletinsService extends Service {
  /**
   * 搜索公告
   * @param {Object} params 搜索参数
   */
  async search(params) {
    const { model } = this.ctx;
    const bulletins = await model.Bulletins.findAndCountAll({
      limit: 10,
      offset: (params.page - 1) * 10,
    });
    return bulletins;
  }

  /**
   * 获取公告信息
   * @param {*} key 公告key
   */
  async get(key) {
    const { model } = this.ctx;
    const bulletin = await model.Bulletins.findOne({ where: { key }, raw: true });
    return bulletin;
  }
}

module.exports = BulletinsService;
