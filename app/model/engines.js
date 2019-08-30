'use strict';

module.exports = app => {
  const { STRING } = app.Sequelize;

  const Engines = app.model.define('engines', {
    key: { type: STRING },
    model: { type: STRING, comment: '型号' },
    company: { type: STRING, comment: '企业名称' },
    volume: { type: STRING, comment: '排量' },
    power: { type: STRING, comment: '功率' },
    oilWear: { type: STRING, comment: '油耗' },
  },
  {
    tableName: 'engines',
    underscored: true,
    comment: '发动机信息表',
    indexes: [{
      unique: true,
      fields: [ 'key', 'model' ],
    }, {
      fields: [ 'key', 'model' ],
      where: {
        status: 'public',
      },
    }],
  });

  return Engines;
};
