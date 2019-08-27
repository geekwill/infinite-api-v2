'use strict';

const uuid = require('node-uuid');
const Service = require('egg').Service;

class UserService extends Service {
  /**
   * 微信 code 登录
   * @param {string} code 微信code
   */
  async login(code) {
    const { app, ctx } = this;
    const { service, model } = ctx;
    // 解析微信数据
    const wechat = await service.wechat.login(code);
    // 查找创建 open 用户
    const data = { uuid: uuid.v4(), sessionKey: wechat.session_key, openId: wechat.openid };
    const [ user ] = await model.User.findOrCreate({ where: { openId: data.openId }, defaults: data, raw: true });
    // 缓存 redis 并生成 jwttoken
    await app.redis.set(user.uuid, JSON.stringify(user));
    return app.jwt.sign(user.uuid, app.config.jwt.secret);
  }

  /**
   * 解析加密数据
   * @param {Object} user 用户信息
   * @param {string} encryptedData 加密
   * @param {string} iv 加密
   */
  async decryptPhone(user, encryptedData, iv) {
    const { app, ctx } = this;
    const { service, model } = ctx;
    // 解析微信 手机号
    const wechatData = await service.wechat.decryptData(user.sessionKey, encryptedData, iv);
    // 合并手机号码并更新用户信息
    const userInfo = Object.assign(user, { phone: wechatData.phoneNumber });
    await model.User.update(userInfo, { where: { uuid: user.uuid } });
    // 更新缓存 radis
    await app.redis.set(userInfo.uuid, JSON.stringify(userInfo));
    return userInfo;
  }

  /**
   * 创建用户信息
   * @param {Object} user USER
   */
  async register(user) {
    const { app, ctx } = this;
    // 创建或者更新用户
    await ctx.model.User.upsert(user);
    // 更新 radis
    await app.redis.set(user.uuid, JSON.stringify(user));
    return user;
  }
}

module.exports = UserService;
