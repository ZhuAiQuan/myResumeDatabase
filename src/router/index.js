/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2022-05-09 10:37:04
 * @LastEditTime: 2022-05-09 10:43:19
 * @LastEditors: zaq
 * @Reference: 
 */
const Router = require('koa-router');
const router = new Router();
const fs = require('fs');
const path = require('path');

// 自动注册路由
fs.readdirSync(path.join(__dirname)).filter(file => file !== 'index.js').forEach(file => {
  if (file.includes('.js')) {
    const name = file.split('.')[0];
    const route = require(path.join(__dirname, file));
    router.use(`/${name}`, route.routes(), route.allowedMethods())
  }
})
router.get('/', async ctx => {
  ctx.body = 'hello koa2'
})

module.exports = router