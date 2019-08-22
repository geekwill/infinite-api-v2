'use strict';

// app/service/topics.js
const Service = require('egg').Service;

class EnginesService extends Service {
  /**
   * 搜索公告
   * @param {Object} key 搜索参数
   */
  async get(key) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const engines = await this.app.mysql.select('engines', {
      where: { key },
    });
    return engines;
  }
}

module.exports = EnginesService;
