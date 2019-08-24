'use strict';

module.exports = {
  keys: 'infinite-api-v2_1566375679681_1913',
  middleware: [ 'userHandler', 'errorHandler' ],
  sequelize: {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'infinite_official',
    username: 'root',
    password: 'root',
  },
  jwt: {
    secret: '7956d314-daed-4b8c-8792-c25919b623a8',
  },
  errorHandler: {
    match: '/api',
  },
  wechat: {
    appId: 'wx29ca14bf869f6349',
    appSecret: '9d981314acc8b376254f1746be90cad7',
  },
};
