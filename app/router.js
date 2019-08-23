'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // 公告
  app.router.post('/api/v2/bulletins/search', app.controller.bulletins.search);
  app.router.get('/api/v2/bulletins', app.controller.bulletins.get);
  // 底盘
  app.router.post('/api/v2/chasses/search', app.controller.chasses.search);
  app.router.get('/api/v2/chasses', app.controller.chasses.get);
  // 参数
  app.router.get('/api/v2/arguments', app.controller.arguments.get);
  // 发动机
  app.router.get('/api/v2/engines', app.controller.engines.get);
  // 燃油达标公告
  app.router.post('/api/v2/fueloils/search', app.controller.fueloils.search);
  app.router.get('/api/v2/fueloils', app.controller.fueloils.get);
  // 用户
  app.router.post('/api/v2/user/login', app.controller.user.login);
  app.router.post('/api/v2/user/decryptData', app.controller.user.decryptData);
  // 收藏
  app.router.post('/api/v2/favorites/search', app.jwt, app.controller.favorites.search);
  app.router.get('/api/v2/favorites', app.jwt, app.controller.favorites.create);
};
