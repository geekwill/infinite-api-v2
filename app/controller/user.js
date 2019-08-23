'use strict';

const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const searchRule = {
  userName: 'string',
};

class UserController extends Controller {
  /**
   * 搜索公告
   */
  async login() {
    const { ctx, app } = this;
    ctx.validate(searchRule, ctx.request.body);
    const token = app.jwt.sign({ foo: 'bar' }, app.config.jwt.secret);
    console.log('token: ', token);
    ctx.success({ token });
  }
}
module.exports = UserController;
