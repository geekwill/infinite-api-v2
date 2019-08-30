'use strict';

module.exports = app => {
  const { STRING, TEXT, INTEGER } = app.Sequelize;

  const Bulletins = app.model.define('bulletins', {
    key: { type: STRING, unique: true },
    batch: { type: INTEGER, comment: '批次' },
    name: { type: STRING, comment: '名称' },
    model: { type: STRING, comment: '型号' },
    chassisModel: { type: STRING, comment: '底盘型号' },
    chassisDeclare: { type: STRING, comment: '底盘是否同期申报' },
    chassisId: { type: STRING, comment: '底盘ID' },
    brand: { type: STRING, comment: '商标' },
    companyName: { type: STRING, comment: '企业名称' },
    registerAdrr: { type: STRING, comment: '注册地址' },
    productionAdrr: { type: STRING, comment: '生产地址' },
    serial: { type: STRING, comment: '序号' },
    images: { type: STRING(800), comment: '图片' },
    html: { type: TEXT, comment: 'html代码保存' },
  },
  {
    tableName: 'bulletins',
    underscored: true,
    comment: '公告信息表',
    indexes: [{
      fields: [ 'key', 'model', 'chassis_model', 'batch' ],
      where: {
        status: 'public',
      },
    }],
  });

  return Bulletins;
};
