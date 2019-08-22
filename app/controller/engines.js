'use strict';

// app/controller/topics.js
const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const createRule = {
  key: 'string',
};

class EnginesController extends Controller {
  async get() {
    const ctx = this.ctx;
    ctx.validate(createRule, ctx.params);
    // 调用 service 创建一个 topic
    const engines = await ctx.service.engines.get(ctx.params.key);
    // 设置响应内容和响应状态码
    ctx.success(engines);
  }
}
module.exports = EnginesController;
