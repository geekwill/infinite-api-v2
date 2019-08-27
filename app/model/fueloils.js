'use strict';

module.exports = app => {
  const { STRING, TEXT } = app.Sequelize;

  const Fueloils = app.model.define('fueloils', {
    productModel: { type: STRING, comment: '产品型号' },
    engineModel: { type: STRING, comment: '发动机型号' },
    standard: { type: STRING, comment: '达标车型编号' },
    productName: { type: STRING, comment: '产品名称' },
    productCompany: { type: STRING, comment: '企业名称' },
    json: { type: TEXT, comment: '数据json' },
    html: { type: TEXT('medium'), comment: '燃油公告HTML代码' },
  },
  {
    tableName: 'fueloils',
    underscored: true,
    comment: '燃油公告表',
    indexes: [{
      fields: [ 'productModel', 'standard' ],
      where: {
        status: 'public',
      },
    }],
  });

  return Fueloils;
};
