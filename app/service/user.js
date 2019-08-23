'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  /**
   * 微信 code 登录
   */
  async login(code) {
    const { service } = this.ctx;
    // 解析微信 token
    const data = await service.wechat.login(code);
    if (!data.errmsg) {
      const user = await this.app.mysql.get('user', { openid: data.openid });
      if (user) {
        const refreshUser = Object.assign({}, user, data);
        await this.app.mysql.update('user', refreshUser);
        return refreshUser;
      } else {
        const result = await this.app.mysql.insert('user', data);
        if (result.affectedRows === 1) {
          return data;
        } else {
          throw new Error(result.message);
        }
      }
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
}

module.exports = UserService;
