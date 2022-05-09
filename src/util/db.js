/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2022-05-09 10:51:08
 * @LastEditTime: 2022-05-09 14:37:54
 * @LastEditors: zaq
 * @Reference: 
 */
const { user, password } = require('../config');
const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user,
  password
})

module.exports = (sql, db = '') => {
  let time = null;
  return new Promise((resolve, reject) => {
    // 3s内无连接则自动断开
    if (time) clearTimeout(time)
    // 检查数据库
    if (!db && !sql.includes('create database') && !sql.includes('show databases') && !sql.includes('drop database')) reject('需要先指定数据库')
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
        throw err;
      }
      // 需要先指定库
      if(db && !sql.includes(`use ${db}`)) {
        connection.query(`use ${db}`)
      }
      connection.query(sql, (err, rows) => {
        if (err) {
          reject(err);
          throw err
        }
        time = setTimeout(() => {
          connection.release()
        }, 1000 * 3);
        resolve(rows);
      })
    })
  })
}