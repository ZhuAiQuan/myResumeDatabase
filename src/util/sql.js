/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2022-05-09 11:31:22
 * @LastEditTime: 2022-05-09 16:00:03
 * @LastEditors: zaq
 * @Reference: 
 */
const query = require('./db');

// 查询数据库是否存在 第二个参数为不存在是否创建
async function checkDatabase(db, need = true) {
  const list = await query(`show databases like '${db}'`);
  if (list.length) return list
  if (!list.length && need) createDataBase(db)
  else return '请先创建数据库'
}
// 创建数据库
async function createDataBase(db) {
  await query(`create database ${db}`)
}
// 删除数据库
async function dropDataBase(db) {
  await query(`drop database '${db}'`)
}
// 查询表是否存在 否则创建
async function checkTables(table, db, sql) {
  const list = await query(`show tables like '${table}'`, db);

  if (list.length) return list
  else {
    if (sql) {
      await createTables(table, sql, db)
    } else {
      return `查询不到表名，请先创建表结构！`
    }
  }
}
// 建表
async function createTables(table, sqls, db) {
  const sql = `
    create table ${table}(${sqls})
  `;
  await query(sql, db)
}
// 表操作 清空表
async function clearTable(table, db, where = '') {
  const sql = where
    ? `delete from ${table} where ${where}`
    : `delete from ${table}`
  await query(sql, db)
}
// 表操作 添加数据
async function addTable(table, value, db, key = '') {
  const sql = key
    ? `insert into ${table} (${key}) values (${value})`
    : `insert into ${table} values (${value})`;
  await query(sql, db)
}
// 更新表数据
async function updateTable(table, ctx, where, db) {
  const sql = `
    update ${table} set ${ctx} where ${where}
  `;
  await query(sql, db)
}
// 查询、条件查询
async function searchTable(table, db, where = '') {
  const sql = where
    ? `select * from ${table} ${where}`
    : `select * from ${table}`
  const result = await query(sql, db);
  return result
}
// 查询总数量
async function queryCount(table, db) {
  const result = await query(`select count(*) as count from ${table}`, db);
  return result[0].count
}

module.exports = {
  checkDatabase,
  dropDataBase,
  checkTables,
  clearTable,
  addTable,
  updateTable,
  searchTable,
  queryCount
}