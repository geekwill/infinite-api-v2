'use strict';

// app/service/topics.js
const Service = require('egg').Service;

class FavoritesService extends Service {
  /**
   * 搜索用户收藏
   * @param {Object} params 搜索参数
   * @param {Object} token 用户token
   */
  async search(params, token) {
    const favorites = await this.app.mysql.select('favorites', {
      where: {
        token,
      },
      limit: 10,
      offset: (params.page - 1) * 10,
    });
    return favorites;
  }

  /**
   * 增加用户收藏
   * @param {string} key 公告key
   * @param {string} token 公告key
   */
  async create(key, token) {
    const favorite = await this.app.mysql.insert('favorites', { key, token });
    return favorite;
  }
}

module.exports = FavoritesService;
