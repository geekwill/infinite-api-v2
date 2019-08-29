'use strict';

const Service = require('egg').Service;

class FavoritesService extends Service {
  /**
   * 搜索用户收藏
   * @param {Object} user 用户token
   */
  async search(user) {
    const { app, ctx } = this;
    const { model } = ctx;
    const sql = `SELECT fa.*, 
        if( fa.type = 1, bu.name, ch.name) name,
        if( fa.type = 1, bu.brand, ch.brand) brand,
        if( fa.type = 1, bu.batch, ch.batch) batch,
        if( fa.type = 1, bu.model, ch.model) model,
        if( fa.type = 1, bu.company_name, ch.company_name) companyName,
        if( fa.type = 1, bu.images, ch.images) images
      FROM favorites fa 
      LEFT JOIN bulletins bu ON fa.key = bu.key AND fa.type = 1
      LEFT JOIN chassis ch ON fa.key = ch.key AND fa.type = 2
      WHERE fa.uuid = '${user.uuid}'`;
    const favorites = model.query(sql, { type: app.Sequelize.QueryTypes.SELECT });
    return favorites;
  }

  /**
   * 增加用户收藏
   * @param {string} params 公告key
   * @param {string} user 公告key
   */
  async createOrDelete(params, user) {
    const { model } = this.ctx;
    const where = Object.assign({}, params, { uuid: user.uuid });
    const findOne = await model.Favorites.findOne({ where, raw: true });
    if (findOne) {
      await model.Favorites.destroy({ where });
    } else {
      await model.Favorites.create(where);
    }
    return true;
  }

  /**
   * 获取收藏信息
   * @param {string} key 公告key
   * @param {string} user 公告key
   */
  async get(key, user) {
    const { model } = this.ctx;
    const findOne = await model.Favorites.findOne({ where: { key, uuid: user.uuid }, raw: true });
    return findOne;
  }
}

module.exports = FavoritesService;
