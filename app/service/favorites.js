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
    const sql = `SELECT bu.* FROM favorites fa 
      LEFT JOIN bulletins bu ON fa.key = bu.key 
      WHERE fa.uuid = '${user.uuid}' LIMIT ${(params.page - 1) * 10}, 10`;
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
