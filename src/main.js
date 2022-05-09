/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2022-05-09 09:56:54
 * @LastEditTime: 2022-05-09 15:58:13
 * @LastEditors: zaq
 * @Reference: 
 */
const Koa = require('koa');
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const path = require('path');
const router = require('./router');
const init = require('./util/initialization');
// 初始化建表
init()

const app = new Koa();
app.use(cors()).use(bodyParser()).use(static(path.join(__dirname, 'public')));
app.use(router.routes(), router.allowedMethods());

module.exports = (port) => {
  app.listen(port, () => {
    console.log(`[servers]: runing at http://localhost:${port}`)
  })
}