'use strict';

// app/controller/topics.js
const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const searchRule = {
  page: 'string',
};
// 定义创建接口的请求参数规则
const getRule = {
  model: 'string',
};

class FueloilsController extends Controller {
  /**
   * 搜索公告
   */
  async search() {
    const ctx = this.ctx;
    ctx.validate(searchRule, ctx.request.body);
    // 调用 service 创建一个 topic
    const fueloils = await ctx.service.fueloils.search(ctx.request.body);
    // 设置响应内容和响应状态码
    ctx.success(fueloils);
  }

  /**
   * 获取公告信息
   */
  async get() {
    const ctx = this.ctx;
    ctx.validate(getRule, ctx.query);
    // 调用 service 创建一个 topic
    const fueloil = await ctx.service.fueloils.get(ctx.query.model);
    // 设置响应内容和响应状态码
    ctx.success(fueloil);
  }
}
module.exports = FueloilsController;
