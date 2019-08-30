'use strict';

module.exports = app => {
  const { STRING, TEXT, INTEGER } = app.Sequelize;

  const Chassis = app.model.define('chassis', {
    key: { type: STRING, unique: true },
    batch: { type: INTEGER, comment: '批次' },
    name: { type: STRING, comment: '名称' },
    model: { type: STRING, comment: '型号' },
    brand: { type: STRING, comment: '商标' },
    category: { type: STRING, comment: '类别' },
    companyName: { type: STRING, comment: '企业名称' },
    registerAdrr: { type: STRING, comment: '注册地址' },
    productionAdrr: { type: STRING, comment: '生产地址' },
    serial: { type: STRING, comment: '序号' },
    images: { type: STRING, comment: '图片' },
    html: { type: TEXT, comment: 'html代码保存' },
  },
  {
    tableName: 'chassis',
    underscored: true,
    comment: '底盘信息表',
    indexes: [{
      fields: [ 'key', 'model', 'batch' ],
      where: {
        status: 'public',
      },
    }],
  });

  return Chassis;
};
