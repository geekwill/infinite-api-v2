'use strict';

module.exports = app => {
  const { STRING, TEXT } = app.Sequelize;

  const Chassis = app.model.define('chassis', {
    key: { type: STRING, unique: true },
    batch: { type: STRING, comment: '批次' },
    name: { type: STRING, comment: '名称' },
    model: { type: STRING, comment: '型号' },
    brand: { type: STRING, comment: '商标' },
    category: { type: STRING, comment: '类别' },
    company_name: { type: STRING, comment: '企业名称' },
    register_adrr: { type: STRING, comment: '注册地址' },
    production_adrr: { type: STRING, comment: '生产地址' },
    serial: { type: STRING, comment: '序号' },
    images: { type: STRING, comment: '图片' },
    html: { type: TEXT, comment: 'html代码保存' },
  },
  {
    tableName: 'chassis',
    underscored: true,
    createdAt: 'created_time',
    updatedAt: 'updated_time',
    comment: '底盘信息表',
  });

  return Chassis;
};
