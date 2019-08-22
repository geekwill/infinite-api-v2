/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1566375679681_1913';

  // add your middleware config here
  config.middleware = [ 'errorHandler' ];

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '140.143.184.251',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'qq191754850',
      // 数据库名
      database: 'infinite_official',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: true,
  };

  config.errorHandler = {
    match: '/api',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
