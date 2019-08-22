'use strict';

// app/service/topics.js
const Service = require('egg').Service;

class BulletinsService extends Service {
  /**
   * 搜索公告
   * @param {Object} params 搜索参数
   */
  async search(params) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const bulletins = await this.app.mysql.select('bulletins', {
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
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const bulletin = await this.app.mysql.get('bulletins', { key });
    return bulletin;
  }
}

module.exports = BulletinsService;
