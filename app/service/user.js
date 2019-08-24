'use strict';

const uuid = require('node-uuid');
const Service = require('egg').Service;

class UserService extends Service {
  /**
   * 微信 code 登录
   */
  async login(code) {
    const { app, ctx } = this;
    const { service } = ctx;
    // 解析微信 openid
    const data = await service.wechat.login(code);
    if (!data.errmsg) {
      // 查询当前 openid 是否存在
      const user = await app.mysql.get('user', { openid: data.openid });
      // 用户信息
      const jwtData = user || await this.create(data, uuid.v4());
      // 生成 jwt token
      return app.jwt.sign(jwtData, app.config.jwt.secret);
    } else {
      throw new Error(data.errmsg);
    }
  }

  /**
   * 解析加密数据
   */
  async decryptData(sessionKey, encryptedData, iv) {
    const { service } = this.ctx;
    // 解析微信 手机号
    const data = await service.wechat.decryptData(sessionKey, encryptedData, iv);
    if (data.errmsg) {
      throw new Error(data.errmsg);
    }
    return data;
  }

  /**
   * 创建用户信息
   */
  async create(user, uuid) {
    const { app } = this;
    // 查询当前用户的数据信息
    const data = await app.mysql.get('user', { uuid });
    if (data && data.uuid) {
      // 合并最新用户信息存入数据库
      const mergeUser = Object.assign({}, data, user);
      await app.mysql.update('user', user);
      return mergeUser;
    } else {
      // 不存在，生成 uuid 并增加用户信息
      const mergeUser = Object.assign({}, user, { uuid });
      const result = await app.mysql.insert('user', mergeUser);
      if (result.affectedRows === 1) {
        return Object.assign({}, mergeUser, {id: result.insertId});
      } else {
        throw new Error(result.message);
      }
    }
  }
}

module.exports = UserService;
