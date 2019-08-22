'use strict';

// app/extend/context.js
module.exports = {
  success(data) {
    // 设置响应内容和响应状态码
    this.body = { code: 200, message: 'success', data };
    this.status = 200;
  },
  error(code, message) {
    // 设置响应内容和响应状态码
    this.body = { code, message };
    this.status = 200;
  },
};
