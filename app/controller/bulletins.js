'use strict';

// app/controller/topics.js
const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const createRule = {
  page: 'string',
};

class BulletinsController extends Controller {
  async search() {
    const ctx = this.ctx;
    ctx.validate(createRule, ctx.request.body);
    // 调用 service 创建一个 topic
    const bulletins = await ctx.service.bulletins.search(ctx.request.body);
    // 设置响应内容和响应状态码
    ctx.success(bulletins);
  }
}
module.exports = BulletinsController;
