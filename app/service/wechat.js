'use strict';

const Service = require('egg').Service;
const crypto = require('crypto');

class WechatService extends Service {
  constructor(ctx) {
    super(ctx);
    this.jscode2sessionUri = 'https://api.weixin.qq.com/sns/jscode2session'; // 微信临时授权码
    this.tokenUri = 'https://api.weixin.qq.com/cgi-bin/token'; // 微信凭据
    this.sendMsgUri = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send'; // 微信服务通知
  }

  /**
   * @description 登录凭证校验
   * @link https://developers.weixin.qq.com/miniprogram/dev/api/code2Session.html?search-key=jscode2session
   */
  async login(code) {
    const { ctx, app, jscode2sessionUri } = this;
    const { appId, appSecret } = app.config.wechat;
    const url = `${jscode2sessionUri}?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`;
    const res = await ctx.curl(url, { dataType: 'json' });
    if (res.data.errmsg) {
      throw new Error(res.data.errmsg);
    }
    return res.data;
  }

  /**
   * @description 加密数据解密算法
   * @link https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html
   */
  async decryptData(sessionKey, encryptedData, iv) {
    const { appId } = this.app.config.wechat;
    const sessionKeyBuffer = new Buffer.from(sessionKey, 'base64');
    const encryptedDataBuffer = new Buffer.from(encryptedData, 'base64');
    const ivBuffer = new Buffer.from(iv, 'base64');
    const decipher = crypto.createDecipheriv('aes-128-cbc', sessionKeyBuffer, ivBuffer);
    let decoded = '';
    try {
      decipher.setAutoPadding(true);
      decoded = decipher.update(encryptedDataBuffer, 'binary', 'utf8');
      decoded += decipher.final('utf8');
      decoded = JSON.parse(decoded);
    } catch (err) {
      throw new Error('Illegal Buffer');
    }
    if (decoded.watermark.appid !== appId) {
      throw new Error('Illegal Appid');
    }
    return decoded;
  }

  /**
   * @description 模板消息
   * @link https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/template-message.html
   */
  async pushMessage(params) {
    const { sendMsgUri } = this;
    const body = {
      touser: params.openid,
      template_id: params.templateid,
      page: params.page,
      form_id: params.formid,
      data: params.formid,
      emphasis_keyword: params.emphasis_keyword,
    };
    const token = await this.getToken();
    const access_token = token.access_token;
    const res = await this.ctx.curl(`${sendMsgUri}?access_token=${access_token}`, {
      method: 'POST',
      contentType: 'json',
      dataType: 'json',
      data: body,
    });
    return res.data;
  }
}

module.exports = WechatService;
