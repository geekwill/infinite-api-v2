'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // 公告
  app.router.post('/api/v2/bulletins/search', app.controller.bulletins.search);
  app.router.get('/api/v2/bulletins/:key', app.controller.bulletins.get);
  // 底盘
  app.router.post('/api/v2/chasses/search', app.controller.chasses.search);
  app.router.get('/api/v2/chasses/:key', app.controller.bulletins.get);
  // 参数
  app.router.get('/api/v2/arguments/:key', app.controller.arguments.get);
  // 发动机
  app.router.get('/api/v2/engines', app.controller.engines.get);
};
