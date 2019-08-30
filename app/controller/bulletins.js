'use strict';

// app/controller/topics.js
const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const searchRule = {
  page: 'string',
};
// 定义创建接口的请求参数规则
const getRule = {
  key: 'string',
};

const standard = {
  国五: 'Ⅴ',
  国四: 'Ⅵ',
  国三: 'GB14621-2011,GB14622-2007',
  国二: 'Ⅱ',
};

class BulletinsController extends Controller {
  /**
   * 搜索公告
   */
  async search() {
    const ctx = this.ctx;
    ctx.validate(searchRule, ctx.request.body);
    // 替换排放标准搜索关键字
    ctx.request.body.emissionStandard = standard[ctx.request.body.emissionStandard];
    // 调用 service 创建一个 topic
    const bulletins = await ctx.service.bulletins.search(ctx.request.body);
    // 设置响应内容和响应状态码
    ctx.success(bulletins);
  }

  /**
   * 获取公告信息
   */
  async get() {
    const ctx = this.ctx;
    ctx.validate(getRule, ctx.query);
    // 调用 service 创建一个 topic
    const bulletin = await ctx.service.bulletins.get(ctx.query.key);
    // 设置响应内容和响应状态码
    ctx.success(bulletin);
  }
}
module.exports = BulletinsController;
