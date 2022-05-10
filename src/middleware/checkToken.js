/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2022-05-10 10:03:26
 * @LastEditTime: 2022-05-10 11:01:18
 * @LastEditors: zaq
 * @Reference: 
 */
const { searchTable } = require('../util/sql');
const { userInfo, database } = require('../config')
// 需要校验权限的接口
const blackList = ['/user/update'];
async function checkToken(ctx, next) {
  const { path } = ctx.request;
  const { token } = ctx.request.headers;

  if (blackList.includes(path)) {
    if (!token) {
      ctx.body = {
        message: '无权限请求!'
      }
      return false
    }
    const result = await searchTable(userInfo, database, `where token='${token}'`);
    if (!result.length) {
      ctx.body = {
        message: 'token失效,请重新登录!'
      }
      return false
    }
  }
  await next()
}
module.exports = checkToken