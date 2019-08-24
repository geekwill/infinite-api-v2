'use strict';

module.exports = app => {
  const { STRING, TEXT } = app.Sequelize;

  const Bulletins = app.model.define('bulletins', {
    key: { type: STRING, unique: true },
    batch: { type: STRING, comment: '批次' },
    name: { type: STRING, comment: '名称' },
    model: { type: STRING, comment: '型号' },
    chassis_model: { type: STRING, comment: '底盘型号' },
    chassis_declare: { type: STRING, comment: '底盘是否同期申报' },
    chassis_id: { type: STRING, comment: '底盘ID' },
    brand: { type: STRING, comment: '商标' },
    company_name: { type: STRING, comment: '企业名称' },
    register_adrr: { type: STRING, comment: '注册地址' },
    production_adrr: { type: STRING, comment: '生产地址' },
    serial: { type: STRING, comment: '序号' },
    images: { type: STRING(800), comment: '图片' },
    html: { type: TEXT, comment: 'html代码保存' },
  },
  {
    tableName: 'bulletins',
    underscored: true,
    createdAt: 'created_time',
    updatedAt: 'updated_time',
    comment: '公告信息表',
  });

  return Bulletins;
};
