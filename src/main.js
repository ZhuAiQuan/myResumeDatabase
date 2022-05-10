/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2022-05-09 09:56:54
 * @LastEditTime: 2022-05-10 11:08:25
 * @LastEditors: zaq
 * @Reference:
 */
const Koa = require("koa");
const cors = require("koa-cors");
const bodyParser = require("koa-bodyparser");
const static = require("koa-static");
const koaBody = require("koa-body");
const path = require("path");
const router = require("./router");
const init = require("./util/initialization");
const checkVerify = require("./middleware/checkVerify");
const checkToken = require("./middleware/checkToken");
// 初始化建表
init();

const app = new Koa();
app
  .use(cors())
  .use(bodyParser())
  .use(static(path.join(__dirname, "public")))
  .use(checkVerify)
  .use(checkToken)
  .use(
    koaBody({
      multipart: true,
      formidable: {
        maxFileSize: 200 * 1024 * 1024,
      },
    })
  )
  .use(router.routes(), router.allowedMethods());

module.exports = (port) => {
  app.listen(port, () => {
    console.log(`[servers]: runing at http://localhost:${port}`);
  });
};
