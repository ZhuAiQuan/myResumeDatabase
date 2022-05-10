/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2022-05-09 10:04:37
 * @LastEditTime: 2022-05-10 10:37:33
 * @LastEditors: zaq
 * @Reference: 
 */
const Router = require('koa-router');
const user = new Router();
const { queryCount, searchTable, clearTable, addTable, updateTable } = require('../util/sql');
const { database, userInfo, verify } = require('../config');
const jwt = require('jsonwebtoken');

user.get('/', async ctx => {
  const result = await queryCount('pc_0', 'today20220426');

  ctx.body = result
})
user.post('/login', async ctx => {
  const { name, password, code } = ctx.request.body;

  const { 'img-verify-code-state': time } = ctx.request.headers;
  if (!name || !password || !code || !time) {
    ctx.body = {
      message: '缺少必要的参数!'
    }
    return false
  }
  const result = await searchTable(verify, database, `where verify='${code}' and code='${time}'`);
  
  if (!result.length || result[0].verify !== code || result[0].code !== time) {
    ctx.body = {
      message: '验证码错误！请点击刷新验证码！'
    }
    return false
  } else {
    // 验证码识别成功 删除库里的数据
    await clearTable(verify, database, `verify='${code}'`)
  }
  // 查询库里用户信息字段
  const user = await searchTable(userInfo, database, `where name='${name}' and password='${password}'`);
  if (user.length) {
    ctx.body = {
      message: `欢迎回来， ${user[0].name}`,
      token: user[0].token
    }
  } else {
    ctx.body = {
      message: '用户名或者密码错误！'
    }
  }
})

user.post('/register', async ctx => {
  const { name, password, code, avatar } = ctx.request.body;
  const { 'img-verify-code-state': time } = ctx.request.headers;

  if (!name || !password || !code || !time) {
    ctx.body = {
      message: '缺少必要的参数!'
    }
    return false
  }
  const result = await searchTable(verify, database, `where verify='${code}' and code='${time}'`);
  if (!result.length || result[0].verify !== code || result[0].code !== time) {
    ctx.body = {
      message: '验证码错误！请点击刷新验证码！'
    }
    return false
  } else {
    // 验证码识别成功 删除库里的数据
    await clearTable(verify, database, `verify='${code}'`)
  }
  // 查询注册用户是否已经注册过了
  const user = searchTable(userInfo, database, `where name='${name}'`);
  if (user.length) {
    ctx.body = {
      message: `用户'${user[0].name}'已经注册过了哦，请直接登录!`
    }
    return false
  }
  // 生成token
  const token = jwt.sign({ name, password }, "secret", { expiresIn: 3600 });
  addTable(userInfo, `'${name}', '${password}', '${token}', '${avatar || ''}'`, database, `name, password, token, avatar`);
  ctx.body = {
    message: '注册成功',
    token
  }
})

user.post('/update', async ctx => {
  const { name, id, code } = ctx.request.body;
  const { 'img-verify-code-state': time } = ctx.request.headers;
  if (!id || !name || !code || !time) {
    ctx.body = {
      message: '缺少必要的参数!'
    }
    return false
  }
  const result = await searchTable(verify, database, `where verify='${code}' and code='${time}'`);
  
  if (!result.length || result[0].verify !== code || result[0].code !== time) {
    ctx.body = {
      message: '验证码错误！请点击刷新验证码！'
    }
    return false
  } else {
    // 验证码识别成功 删除库里的数据
    await clearTable(verify, database, `verify='${code}'`)
  }
  const list = [];
  // // 不能修改的字段
  // const whiteList = ['name', 'id', 'code'];
  // 允许修改的字段
  const whiteList = ['password', 'avatar', 'nickname', 'sign'];
  for(const item in ctx.request.body) {
    if (whiteList.includes(item) && ctx.request.body[item]) {
      list.push(`${item}='${ctx.request.body[item]}'`)
    }
  }
  if (ctx.request.body.password) {
    const token = jwt.sign({ name, password: ctx.request.body.password }, "secret", { expiresIn: 3600 });
    list.push(`token='${token}'`)
  }
  await updateTable(userInfo, list.toString(), `id=${id} and name='${name}'`, database);

  ctx.body = {
    message: ctx.request.body.password ? '修改成功，请重新登录！' : '用户信息修改成功！'
  }
})

module.exports = user