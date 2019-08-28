'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Favorites = app.model.define('favorites', {
    key: { type: STRING, comment: '公告Key' },
    uuid: { type: STRING, comment: '用户UUID' },
    type: { type: INTEGER, comment: '收藏类型1：公告2：底盘' },
  },
  {
    tableName: 'favorites',
    underscored: true,
    comment: '用户收藏表',
  });

  return Favorites;
};
