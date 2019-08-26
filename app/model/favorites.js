'use strict';

module.exports = app => {
  const { STRING } = app.Sequelize;

  const Favorites = app.model.define('favorites', {
    key: { type: STRING, comment: '公告Key' },
    uuid: { type: STRING, comment: '用户UUID' },
  },
  {
    tableName: 'favorites',
    underscored: true,
    createdAt: 'created_time',
    updatedAt: 'updated_time',
    comment: '用户收藏表',
  });

  return Favorites;
};
