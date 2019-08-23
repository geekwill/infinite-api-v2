'use strict';

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
};
