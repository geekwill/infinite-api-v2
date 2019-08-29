'use strict';

const Service = require('egg').Service;

class ChassisService extends Service {
  /**
   * 搜索底盘公告
   * @param {Object} params 搜索参数
   */
  async search(params) {
    const { app, ctx } = this;
    const { model } = ctx;

    const sqlArray = [];
    sqlArray.push('SELECT ch.key, ch.images, ch.name, ch.brand, ch.batch, ch.model, ch.company_name as companyName');
    sqlArray.push('FROM (SELECT * FROM chassis ORDER BY batch DESC) as ch');
    sqlArray.push('LEFT JOIN engines en ON ch.key = en.key');
    sqlArray.push('LEFT JOIN arguments ar ON ch.key = ar.key');
    sqlArray.push('WHERE 1 = 1');
    // 基础参数条件
    if (params.batchMin || params.batchMax) sqlArray.push(`AND ch.batch BETWEEN ${params.batchMin || 0} AND ${params.batchMax || 0}`);
    if (params.model) sqlArray.push(`AND ch.model LIKE '%${params.model}%'`);
    if (params.name) sqlArray.push(`AND ch.name LIKE '%${params.name}%'`);
    if (params.brand) sqlArray.push(`AND ch.brand LIKE '%${params.brand}%'`);
    if (params.companyName) sqlArray.push(`AND ch.company_name LIKE '%${params.companyName}%'`);
    if (params.productionAdrr) sqlArray.push(`AND ch.production_adrr LIKE '%${params.productionAdrr}%'`);
    // 配置参数条件
    if (params.axles) sqlArray.push(`AND ar.axles = '${params.axles}'`);
    if (params.wheelBase) sqlArray.push(`AND ar.wheel_base = '${params.wheelBase}'`);
    if (params.tireNumber) sqlArray.push(`AND ar.tire_number = '${params.tireNumber}'`);
    if (params.tireSize) sqlArray.push(`AND ar.tire_size = '${params.tireSize}'`);
    if (params.emissionStandard) sqlArray.push(`AND ar.emission_standard LIKE '%${params.emissionStandard}%'`);
    if (params.fuelType) sqlArray.push(`AND ar.fuel_type LIKE '%${params.fuelType}%'`);
    if (params.seating) sqlArray.push(`AND ar.seating = '${params.seating}'`);
    // 发动机参数条件
    if (params.engineModel) sqlArray.push(`AND en.model LIKE '%${params.engineModel}%'`);
    if (params.engineVolume) sqlArray.push(`AND en.volume = ${params.engineVolume}`);
    if (params.enginePower) sqlArray.push(`AND en.power = ${params.enginePower}`);
    if (params.engineCompany) sqlArray.push(`AND en.company LIKE '%${params.engineCompany}%'`);
    sqlArray.push(`LIMIT ${(params.page - 1) * 10}, 10;`);
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
    const chasse = await model.Chassis.findOne({ where: { key }, raw: true });
    return chasse;
  }
}

module.exports = ChassisService;
