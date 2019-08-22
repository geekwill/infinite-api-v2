'use strict';

// app/service/topics.js
const Service = require('egg').Service;

class BulletinsService extends Service {
  async search(params) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const bulletins = await this.app.mysql.select('bulletins', {
      limit: 10,
      offset: (params.page - 1) * 10,
    });
    return bulletins;
  }
}

module.exports = BulletinsService;
