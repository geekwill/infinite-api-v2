'use strict';

// app/service/topics.js
const Service = require('egg').Service;

class ArgumentsService extends Service {
  async get(key) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const argument = await this.app.mysql.get('arguments', { key });
    return argument;
  }
}

module.exports = ArgumentsService;
