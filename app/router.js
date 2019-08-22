'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  app.router.post('/api/v2/bulletins/search', app.controller.bulletins.search);
  app.router.resources('bulletins', '/api/v2/bulletins', app.controller.bulletins);
};
