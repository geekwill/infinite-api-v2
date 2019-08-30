'use strict';

const Service = require('egg').Service;

class BulletinsService extends Service {
  /**
   * 搜索公告
   * @param {Object} params 搜索参数
   */
  async search(params) {
    const { app, ctx } = this;
    const { model } = ctx;

    const sqlArray = [];
    sqlArray.push('SELECT DISTINCT bu.key, ch.key as chassisKey, bu.images, bu.name, bu.brand, bu.batch, bu.model, bu.company_name as companyName');
    sqlArray.push('FROM (SELECT * FROM bulletins WHERE 1 = 1');
    // 基础参数条件
    if (params.batchMin || params.batchMax) sqlArray.push(`AND batch BETWEEN ${params.batchMin || 0} AND ${params.batchMax || 0}`);
    if (params.model) sqlArray.push(`AND model LIKE '%${params.model}%'`);
    if (params.name) sqlArray.push(`AND name LIKE '%${params.name}%'`);
    if (params.brand) sqlArray.push(`AND brand LIKE '%${params.brand}%'`);
    if (params.companyName) sqlArray.push(`AND company_name LIKE '%${params.companyName}%'`);
    if (params.productionAdrr) sqlArray.push(`AND production_adrr LIKE '%${params.productionAdrr}%'`);
    sqlArray.push(`ORDER BY batch DESC LIMIT ${(params.page - 1) * 10}, 10) as bu`);
    // 链接表
    sqlArray.push('LEFT JOIN chassis ch ON bu.chassis_model = ch.model');
    sqlArray.push('LEFT JOIN engines en ON bu.key = en.key');
    sqlArray.push('LEFT JOIN arguments ar ON bu.key = ar.key');
    sqlArray.push('WHERE 1 = 1');
    // 配置参数条件
    if (params.axles) sqlArray.push(`AND ar.axles = '${params.axles}'`);
    if (params.wheelBase) sqlArray.push(`AND ar.wheel_base = '${params.wheelBase}'`);
    if (params.tireNumber) sqlArray.push(`AND ar.tire_number = '${params.tireNumber}'`);
    if (params.tireSize) sqlArray.push(`AND ar.tire_size = '${params.tireSize}'`);
    if (params.emissionStandard) sqlArray.push(`AND ar.emission_standard LIKE '%${params.emissionStandard}%'`);
    if (params.fuelType) sqlArray.push(`AND ar.fuel_type LIKE '%${params.fuelType}%'`);
    if (params.seating) sqlArray.push(`AND ar.seating = '${params.seating}'`);
    if (params.totalMassMin || params.totalMassMax) sqlArray.push(`AND ar.total_mass BETWEEN ${params.totalMassMin || 0} AND ${params.totalMassMax || 0}`);
    if (params.curbWeightMin || params.curbWeightMax) sqlArray.push(`AND ar.curb_weight BETWEEN ${params.curbWeightMin || 0} AND ${params.curbWeightMax || 0}`);
    if (params.contourLongMin || params.contourLongMax) sqlArray.push(`AND ar.contour_long BETWEEN ${params.contourLongMin || 0} AND ${params.contourLongMax || 0}`);
    if (params.contourWideMin || params.contourWideMax) sqlArray.push(`AND ar.contour_wide BETWEEN ${params.contourWideMin || 0} AND ${params.contourWideMax || 0}`);
    if (params.contourHighMin || params.contourHighMax) sqlArray.push(`AND ar.contour_high BETWEEN ${params.contourHighMin || 0} AND ${params.contourHighMax || 0}`);
    if (params.boxLongMin || params.boxLongMax) sqlArray.push(`AND ar.box_long BETWEEN ${params.boxLongMin || 0} AND ${params.boxLongMax || 0}`);
    if (params.boxWideMin || params.boxWideMax) sqlArray.push(`AND ar.box_wide BETWEEN ${params.boxWideMin || 0} AND ${params.boxWideMax || 0}`);
    if (params.boxHighMin || params.boxHighMax) sqlArray.push(`AND ar.box_high BETWEEN ${params.boxHighMin || 0} AND ${params.boxHighMax || 0}`);
    // 底盘参数条件
    if (params.chassisBrand) sqlArray.push(`AND ch.brand LIKE '%${params.chassisBrand}%'`);
    if (params.chassisModel) sqlArray.push(`AND ch.model LIKE '%${params.chassisModel}%'`);
    if (params.chassisCompany) sqlArray.push(`AND ch.company_name LIKE '%${params.chassisCompany}%'`);
    if (params.chassisAddre) sqlArray.push(`AND ch.production_adrr LIKE '%${params.chassisAddre}%'`);
    // 发动机参数条件
    if (params.engineModel) sqlArray.push(`AND en.model LIKE '%${params.engineModel}%'`);
    if (params.engineVolume) sqlArray.push(`AND en.volume = ${params.engineVolume}`);
    if (params.enginePower) sqlArray.push(`AND en.power = ${params.enginePower}`);
    if (params.engineCompany) sqlArray.push(`AND en.company LIKE '%${params.engineCompany}%'`);
    // 拼接 SQL 执行查询
    const sql = sqlArray.join(' ');
    const list = await model.query(sql, { type: app.Sequelize.QueryTypes.SELECT });
    return list;
  }

  /**
   * 获取公告信息
   * @param {*} key 公告key
   */
  async get(key) {
    const { model } = this.ctx;
    const bulletin = await model.Bulletins.findOne({ where: { key }, raw: true });
    return bulletin;
  }
}

module.exports = BulletinsService;
