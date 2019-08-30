'use strict';

module.exports = app => {
  const { STRING } = app.Sequelize;

  const User = app.model.define('user', {
    uuid: { type: STRING, comment: '用户UUID' },
    phone: { type: STRING(11), comment: '手机号' },
    openId: { type: STRING, comment: '微信openid' },
    nickName: { type: STRING, comment: '微信昵称' },
    avatarUrl: { type: STRING, comment: '微信图像' },
    gender: { type: STRING, comment: '微信性别' },
    country: { type: STRING, comment: '微信国家' },
    province: { type: STRING, comment: '微信省份' },
    city: { type: STRING, comment: '微信城市' },
    language: { type: STRING, comment: '微信语言' },
    sessionKey: { type: STRING, comment: '微信sessinkey' },
  }, {
    tableName: 'user',
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: [ 'uuid', 'phone', 'open_id' ],
      },
    ],
  });

  return User;
};
