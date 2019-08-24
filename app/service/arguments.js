'use strict';

const Service = require('egg').Service;

class ArgumentsService extends Service {
  async get(key) {
    const { model } = this.ctx;
    const argument = await model.Arguments.findOne({ where: { key }, raw: true });
    return argument;
  }
}

module.exports = ArgumentsService;
