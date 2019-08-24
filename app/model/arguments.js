'use strict';

module.exports = app => {
  const { STRING, TEXT } = app.Sequelize;

  const Arguments = app.model.define('arguments', {
    key: { type: STRING, unique: true },
    contour_long: { type: STRING, comment: '外形尺寸（长）' },
    contour_wide: { type: STRING, comment: '外形尺寸（宽）' },
    contour_high: { type: STRING, comment: '外形尺寸（高）' },
    box_long: { type: STRING, comment: '货箱尺寸（长）' },
    box_wide: { type: STRING, comment: '货箱尺寸（宽）' },
    box_high: { type: STRING, comment: '货箱尺寸（高）' },
    emission_standard: { type: STRING, comment: '排放标准' },
    fuel_type: { type: STRING, comment: '燃料种类' },
    speed: { type: STRING, comment: '车速' },
    total_mass: { type: STRING, comment: '总质量' },
    mass_coefficient: { type: STRING, comment: '载质量利用系数' },
    load_rating: { type: STRING, comment: '额定载质量' },
    turn_type: { type: STRING, comment: '转向型式' },
    curb_weight: { type: STRING, comment: '整备质量' },
    axles: { type: STRING, comment: '轴数' },
    quasi_trailer: { type: STRING, comment: '准拖挂车总质量' },
    wheel_base: { type: STRING, comment: '轴距' },
    tire_size: { type: STRING, comment: '轮胎规格' },
    springs: { type: STRING, comment: '钢板弹簧片数' },
    bearing_quality: { type: STRING, comment: '半挂车鞍座最大允许承载质量' },
    tire_number: { type: STRING, comment: '轮胎数' },
    passengers: { type: STRING, comment: '驾驶室准乘人数' },
    seating: { type: STRING, comment: '额定载客（含驾驶员）（座位数）' },
    before_tread: { type: STRING, comment: '轮距（前)mm' },
    after_tread: { type: STRING, comment: '轮距（后)mm' },
    angle: { type: STRING, comment: '接近角/离去角' },
    ident_company: { type: STRING, comment: '反光标识生产企业' },
    ident_model: { type: STRING, comment: '反光标识型号' },
    ident_brand: { type: STRING, comment: '反光标识商标' },
    abs: { type: STRING, comment: '防抱死制动系统' },
    vin: { type: STRING, comment: '车辆识别代号' },
    suspension: { type: STRING, comment: '前悬/后悬' },
    remark: { type: TEXT, comment: '其他备注' },
    explain: { type: TEXT, comment: '说明' },
    fuel_declare: { type: STRING, comment: '油耗申报值(L/100km)' },
  },
  {
    tableName: 'arguments',
    underscored: true,
    createdAt: 'created_time',
    updatedAt: 'updated_time',
    comment: '公告车辆参数表',
  });

  return Arguments;
};
