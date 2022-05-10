/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2022-05-09 17:08:52
 * @LastEditTime: 2022-05-09 17:39:50
 * @LastEditors: zaq
 * @Reference: 
 */
const Router = require('koa-router');
const captcha = new Router();
const svgCaptcha = require('svg-captcha');
const { addTable, searchTable, updateTable } = require('../util/sql');
const { database, verify } = require('../config')

captcha.get('/', async ctx => {
  const { 'img-verify-code-state': code } = ctx.request.headers;
  const { text, data } = svgCaptcha.create({
    color: true,
    noise: 5
  });
  const result = await searchTable(verify, database, `where code='${code}'`);
  if (result.length) {
    // 更新覆盖掉
    updateTable(verify, `verify='${text}'`, `code='${code}'`, database)
  } else {
    // 新增插入
    addTable(verify, `'${text}','${code}'`, database, `verify, code`)
  }
  ctx.body = {
    data
  }
})

module.exports = captcha