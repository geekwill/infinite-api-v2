'use strict';

module.exports = app => {
  const { STRING, TEXT } = app.Sequelize;

  const Fueloils = app.model.define('fueloils', {
    product_model: { type: STRING, comment: '产品型号' },
    engine_model: { type: STRING, comment: '发动机型号' },
    standard: { type: STRING, comment: '达标车型编号' },
    product_name: { type: STRING, comment: '产品名称' },
    product_company: { type: STRING, comment: '企业名称' },
    json: { type: TEXT, comment: '数据json' },
    html: { type: TEXT('medium'), comment: '燃油公告HTML代码' },
  },
  {
    tableName: 'fueloils',
    underscored: true,
    createdAt: 'created_time',
    updatedAt: 'updated_time',
    comment: '燃油公告表',
    indexes: [{
      fields: [ 'product_model', 'standard' ],
      where: {
        status: 'public',
      },
    }],
  });

  return Fueloils;
};
