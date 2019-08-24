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
    // 解析微信 openid
    const data = await service.wechat.login(code);
    // 查询 open 用户是否存在
    const openUser = await model.User.findOne({ where: { openid: data.openid }, raw: true });
    // 获取需要创建或者更新的用户
    const user = openUser ? Object.assign({}, openUser, data) : Object.assign({}, data, { uuid: uuid.v4() });
    // 注册用户
    const result = await service.user.register(user);
    return app.jwt.sign({ uuid: result.uuid, session_key: result.session_key }, app.config.jwt.secret);
  }

  /**
   * 解析加密数据
   * @param {Object} user 用户信息
   * @param {string} encryptedData 加密
   * @param {string} iv 加密
   */
  async decryptPhone(user, encryptedData, iv) {
    const { service, model } = this.ctx;
    // 解析微信 手机号
    const wechatData = await service.wechat.decryptData(user.session_key, encryptedData, iv);
    // 查询当前用户信息
    const userData = await model.User.findOne({ where: { uuid: user.uuid }, raw: true });
    // 合并手机号码并更新用户信息
    const userInfo = Object.assign(userData, { phone: wechatData.phoneNumber });
    await model.User.update(userInfo, { where: { uuid: user.uuid } });
    return userInfo;
  }

  /**
   * 创建用户信息
   * @param {Object} user USER
   */
  async register(user) {
    const { model } = this.ctx;
    // 创建或者更新用户
    await model.User.upsert(user);
    // 查询最新用户信息
    const result = await model.User.findOne({ where: { uuid: user.uuid }, raw: true });
    return result;
  }
}

module.exports = UserService;
