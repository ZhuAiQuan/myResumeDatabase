/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2022-05-09 10:06:15
 * @LastEditTime: 2022-05-09 10:06:15
 * @LastEditors: zaq
 * @Reference: 
 */
const Router = require('koa-router');
const home = new Router();

home.get('/', async ctx => {
  ctx.body = "home page"
})

module.exports = home