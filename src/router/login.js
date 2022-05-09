/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2022-05-09 10:04:37
 * @LastEditTime: 2022-05-09 10:05:41
 * @LastEditors: zaq
 * @Reference: 
 */
const Router = require('koa-router');
const login = new Router();

login.get('/', async ctx => {
  ctx.body = "login page"
})

module.exports = login