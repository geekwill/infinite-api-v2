'use strict';

module.exports = app => {
  const { STRING } = app.Sequelize;

  const User = app.model.define('user', {
    uuid: STRING,
    phone: STRING(11),
    openid: STRING,
    nickName: STRING,
    avatarUrl: STRING,
    gender: STRING,
    country: STRING,
    province: STRING,
    city: STRING,
    language: STRING,
    session_key: STRING,
  }, {
    tableName: 'user',
    underscored: true,
    createdAt: 'created_time',
    updatedAt: 'updated_time',
    indexes: [
      {
        unique: true,
        fields: [ 'uuid' ],
      },
    ],
  });

  return User;
};
