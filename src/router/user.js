/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2022-05-09 10:04:37
 * @LastEditTime: 2022-05-09 16:02:27
 * @LastEditors: zaq
 * @Reference: 
 */
const Router = require('koa-router');
const user = new Router();
const { queryCount } = require('../util/sql')

user.get('/', async ctx => {
  const result = await queryCount('pc_0', 'today20220426');

  ctx.body = result
})

module.exports = user