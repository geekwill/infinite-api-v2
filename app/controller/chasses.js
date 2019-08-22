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

class ChassesController extends Controller {
  /**
   * 搜索公告
   */
  async search() {
    const ctx = this.ctx;
    ctx.validate(searchRule, ctx.request.body);
    // 调用 service 创建一个 topic
    const chasses = await ctx.service.chasses.search(ctx.request.body);
    // 设置响应内容和响应状态码
    ctx.success(chasses);
  }

  /**
   * 获取公告信息
   */
  async get() {
    const ctx = this.ctx;
    ctx.validate(getRule, ctx.params);
    // 调用 service 创建一个 topic
    const chasse = await ctx.service.chasses.get(ctx.params.key);
    // 设置响应内容和响应状态码
    ctx.success(chasse);
  }
}
module.exports = ChassesController;
