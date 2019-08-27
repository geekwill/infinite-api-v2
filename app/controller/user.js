'use strict';

const Controller = require('egg').Controller;

const wechatRule = {
  code: 'string',
};

const decryptRule = {
  iv: 'string',
  encryptedData: 'string',
};

const createRule = {
  nickName: 'string',
  avatarUrl: 'string',
  gender: 'string',
  country: 'string',
  province: 'string',
  language: 'string',
};

class UserController extends Controller {
  /**
   * 微信 code 登录
   */
  async login() {
    const { ctx } = this;
    const { service } = ctx;
    ctx.validate(wechatRule, ctx.request.body);
    // 解析微信 token
    const data = await service.user.login(ctx.request.body.code);
    ctx.success(data);
  }

  /**
   * 解析微信手机号
   */
  async decryptPhone() {
    const { ctx } = this;
    const { user, service } = ctx;
    ctx.validate(decryptRule, ctx.request.body);
    const { encryptedData, iv } = ctx.request.body;
    // 解析微信 手机号
    const data = await service.user.decryptPhone(user, encryptedData, iv);
    ctx.success(data);
  }

  /**
   * 创建用户
   * @return {[type]} [description]
   */
  async register() {
    const { ctx } = this;
    const { user, service } = ctx;
    ctx.validate(createRule, ctx.request.body);
    const data = await service.user.register(Object.assign({}, user, ctx.request.body));
    ctx.success(data);
  }
}
module.exports = UserController;
