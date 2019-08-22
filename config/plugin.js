'use strict';

const path = require('path');

/** @type Egg.EggPlugin */
module.exports = {
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  security: {
    enable: false,
  },
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  ua: {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/egg-result'),
  },
};
