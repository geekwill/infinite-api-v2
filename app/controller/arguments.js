'use strict';

// app/controller/topics.js
const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const createRule = {
  key: 'string',
};

class ArgumentsController extends Controller {
  /**
   * 获取公告参数信息
   */
  async get() {
    const ctx = this.ctx;
    ctx.validate(createRule, ctx.query);
    // 调用 service 创建一个 topic
    const argument = await ctx.service.arguments.get(ctx.query.key);
    // 设置响应内容和响应状态码
    ctx.success(argument);
  }
}
module.exports = ArgumentsController;
