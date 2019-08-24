'use strict';

// app/controller/topics.js
const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const searchRule = {
  page: 'string',
};
// 定义创建接口的请求参数规则
const createRule = {
  key: 'string',
};

class BulletinsController extends Controller {
  /**
   * 查询用户收藏列表
   */
  async search() {
    const ctx = this.ctx;
    const { request, user, service } = ctx;
    ctx.validate(searchRule, request.body);
    // 调用 service 创建一个 topic
    const favorites = await service.favorites.search(request.body, user);
    // 设置响应内容和响应状态码
    ctx.success(favorites);
  }

  /**
   * 增加用户收藏
   */
  async create() {
    const ctx = this.ctx;
    const { request, user, service } = ctx;

    ctx.validate(createRule, ctx.request.body);
    // 调用 service 创建一个 topic
    const favorite = await service.favorites.create(request.body.key, user);
    // 设置响应内容和响应状态码
    ctx.success(favorite);
  }
}
module.exports = BulletinsController;
