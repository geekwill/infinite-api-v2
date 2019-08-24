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
  city: 'string',
  language: 'string'
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
   * 解析微信加密数据
   */
  async decryptData() {
    const { ctx } = this;
    const { user, service } = ctx;
    ctx.validate(decryptRule, ctx.request.body);
    // 解析微信 手机号
    const { encryptedData, iv } = ctx.request.body;
    const data = await service.user.decryptData(user.sessionKey, encryptedData, iv);
    ctx.success(data);
  }

  /**
   * 创建用户
   * @return {[type]} [description]
   */
  async create() {
    const { ctx } = this;
    const { user, service } = ctx;
    ctx.validate(createRule, ctx.request.body);
    const data = await service.user.create(ctx.request.body, user.uuid);
    ctx.success(data);
  }
}
module.exports = UserController;
