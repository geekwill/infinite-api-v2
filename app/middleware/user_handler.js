'use strict';

module.exports = (option, app) => {
  return async function(ctx, next) {
    try {
      // 获取头部 authorization 信息
      const authorization = ctx.headers.authorization;
      if (authorization) {
        // 截取 token 部分
        const token = authorization.split(' ')[1];
        // 解析 token 里的用户信息
        ctx.user = app.jwt.decode(token);
      }
      await next();
    } catch (err) {
      ctx.body = { code: '401', message: 'Permission verification exception' };
      ctx.status = 401;
    }
  };
};
