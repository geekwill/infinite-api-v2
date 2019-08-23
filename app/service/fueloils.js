'use strict';

// app/service/topics.js
const Service = require('egg').Service;

class FueloilService extends Service {
  /**
   * 搜索公告
   * @param {Object} params 搜索参数
   */
  async search(params) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const fueloils = await this.app.mysql.select('fueloils', {
      limit: 10,
      offset: (params.page - 1) * 10,
    });
    return fueloils;
  }

  /**
   * 获取公告信息
   * @param {*} model model
   */
  async get(model) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const fueloil = await this.app.mysql.get('fueloils', { product_model: model });
    return fueloil;
  }
}

module.exports = FueloilService;
