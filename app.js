'use strict';

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async willReady() {
    // await this.app.model.sync();
  }
}

module.exports = AppBootHook;
