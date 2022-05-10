/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2022-05-09 17:14:58
 * @LastEditTime: 2022-05-09 17:29:09
 * @LastEditors: zaq
 * @Reference: 
 */
const { database, verify } = require('../config');
const { checkTables } = require('../util/sql')

async function checkVerifyCode(ctx, next) {
  if (ctx.request.path.includes('/captcha')) {
    const { 'img-verify-code-state': code } = ctx.request.headers;
    if (!code) {
      ctx.body = {
        message: '请求请先携带标识！'
      }
      return
    } else {
      // 查询建表
      await checkTables(verify, database, `
        id INT PRIMARY KEY AUTO_INCREMENT,
        verify VARCHAR(4) COMMENT '验证码',
        code VARCHAR(16) COMMENT '唯一标识'
      `)
      
    }
  }
  await next()
};

module.exports = checkVerifyCode