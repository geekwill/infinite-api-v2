'use strict';

const Service = require('egg').Service;

class EnginesService extends Service {
  /**
   * 获取发动机
   * @param {Object} key 搜索参数
   */
  async get(key) {
    const { model } = this.ctx;
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const engines = await model.Engines.findAll({ where: { key } });
    return engines;
  }
}

module.exports = EnginesService;
