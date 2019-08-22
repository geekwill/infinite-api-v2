'use strict';

// app/service/topics.js
const Service = require('egg').Service;

class ChassesService extends Service {
  /**
   * 搜索公告
   * @param {Object} params 搜索参数
   */
  async search(params) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const chasses = await this.app.mysql.select('chasses', {
      limit: 10,
      offset: (params.page - 1) * 10,
    });
    return chasses;
  }

  /**
   * 获取公告信息
   * @param {*} key 公告key
   */
  async get(key) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const chasse = await this.app.mysql.get('chasses', { key });
    return chasse;
  }
}

module.exports = ChassesService;
