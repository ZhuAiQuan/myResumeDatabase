/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2022-05-09 11:25:41
 * @LastEditTime: 2022-05-09 15:52:52
 * @LastEditors: zaq
 * @Reference: 
 */
const { checkDatabase, checkTables } = require('./sql');
const { database, userInfo } = require('../config')

async function init() {
  await checkDatabase(database);
  await checkTables(userInfo, database, `
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) COMMENT '用户名',
    password VARCHAR(16) COMMENT '用户密码',
    token LONGTEXT COMMENT '用户秘钥',
    avatar LONGTEXT COMMENT '用户头像',
    nickname VARCHAR(20) COMMENT '用户名称',
    sign LONGTEXT COMMENT '用户签名'
  `)
}

module.exports = init