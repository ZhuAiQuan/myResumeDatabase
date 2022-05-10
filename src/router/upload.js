const Router = require("koa-router");
const fs = require('fs');
const path = require('path')

/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2022-05-10 11:02:50
 * @LastEditTime: 2022-05-10 11:06:44
 * @LastEditors: zaq
 * @Reference: 
 */
const upload = new Router();

upload.post('/', async ctx => {
  const file = ctx.request.files.file;
  const prefix = file.originalFilename.split('.')[1];
  const reader = fs.createReadStream(file.filepath);
  const filePath = path.join(__dirname, '../public/temp/uploads/') + `${file.newFilename}.${prefix}`;
  const upStream = fs.createWriteStream(filePath);
  reader.pipe(upStream);
  ctx.body = {
    msg: '上传成功',
    filePath: `/temp/uploads/${file.newFilename}.${prefix}`,
    // file
  }
})

module.exports = upload