'use strict';

module.exports = app => {
  const { STRING, TEXT } = app.Sequelize;

  const Arguments = app.model.define('arguments', {
    key: { type: STRING, unique: true },
    contourLong: { type: STRING, comment: '外形尺寸（长）' },
    contourWide: { type: STRING, comment: '外形尺寸（宽）' },
    contourHigh: { type: STRING, comment: '外形尺寸（高）' },
    boxLong: { type: STRING, comment: '货箱尺寸（长）' },
    boxWide: { type: STRING, comment: '货箱尺寸（宽）' },
    boxHigh: { type: STRING, comment: '货箱尺寸（高）' },
    emissionStandard: { type: STRING, comment: '排放标准' },
    fuelType: { type: STRING, comment: '燃料种类' },
    speed: { type: STRING, comment: '车速' },
    totalMass: { type: STRING, comment: '总质量' },
    massCoefficient: { type: STRING, comment: '载质量利用系数' },
    loadRating: { type: STRING, comment: '额定载质量' },
    turnType: { type: STRING, comment: '转向型式' },
    curbWeight: { type: STRING, comment: '整备质量' },
    axles: { type: STRING, comment: '轴数' },
    quasiTrailer: { type: STRING, comment: '准拖挂车总质量' },
    wheelBase: { type: STRING, comment: '轴距' },
    tireSize: { type: STRING, comment: '轮胎规格' },
    springs: { type: STRING, comment: '钢板弹簧片数' },
    bearingQuality: { type: STRING, comment: '半挂车鞍座最大允许承载质量' },
    tireNumber: { type: STRING, comment: '轮胎数' },
    passengers: { type: STRING, comment: '驾驶室准乘人数' },
    seating: { type: STRING, comment: '额定载客（含驾驶员）（座位数）' },
    beforeTread: { type: STRING, comment: '轮距（前)mm' },
    afterTread: { type: STRING, comment: '轮距（后)mm' },
    angle: { type: STRING, comment: '接近角/离去角' },
    identCompany: { type: STRING, comment: '反光标识生产企业' },
    identModel: { type: STRING, comment: '反光标识型号' },
    identBrand: { type: STRING, comment: '反光标识商标' },
    abs: { type: STRING, comment: '防抱死制动系统' },
    vin: { type: STRING, comment: '车辆识别代号' },
    suspension: { type: STRING, comment: '前悬/后悬' },
    remark: { type: TEXT, comment: '其他备注' },
    explain: { type: TEXT, comment: '说明' },
    fuelDeclare: { type: STRING, comment: '油耗申报值(L/100km)' },
  },
  {
    tableName: 'arguments',
    underscored: true,
    comment: '公告车辆参数表',
  });

  return Arguments;
};
