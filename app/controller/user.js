'use strict';

const Controller = require('egg').Controller;

const wechatRule = {
  code: 'string',
};

const decryptRule = {
  iv: 'string',
  encryptedData: 'string',
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
   * 搜索公告
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
}
module.exports = UserController;
