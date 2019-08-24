'use strict';

const Service = require('egg').Service;

class FavoritesService extends Service {
  /**
   * 搜索用户收藏
   * @param {Object} params 搜索参数
   * @param {Object} user 用户token
   */
  async search(params, user) {
    const { app, ctx } = this;
    const { model } = ctx;
    const sql = `SELECT bu.* FROM favorites fa LEFT JOIN bulletins bu ON fa.key = bu.key WHERE fa.uuid = '${user.uuid}' LIMIT ${(params.page - 1) * 10}, 10`;
    const favorites = model.query(sql, { type: app.Sequelize.QueryTypes.SELECT });
    return favorites;
  }

  /**
   * 增加用户收藏
   * @param {string} key 公告key
   * @param {string} user 公告key
   */
  async create(key, user) {
    const { model } = this.ctx;
    const favorite = await model.Favorites.create({ key, uuid: user.uuid });
    return favorite;
  }
}

module.exports = FavoritesService;
