var Sequelize = require('sequelize');
var config = require('../config');
const fs = require('fs')
const mysql = require('mysql2/promise');
const modules = require('_/modules')


const createDatabase = async() => {
  let connection  = await mysql.createConnection({
    user: config.dbUser,
    password: config.dbPass
})
  return await connection.execute(` CREATE DATABASE IF NOT EXISTS ${config.dbName} CHARACTER SET utf8 COLLATE utf8_unicode_ci  `)
}
var db = {};
let sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPass, {
  host: 'localhost',
  dialect: 'mysql',
  charset: 'utf8',
  collate: 'utf8_general_ci',
  timezone: 'Asia/Tehran',
  logging: config.logging
});

Object.keys(modules).forEach(key => {
  // console.log(key)
  try {
    const module = modules[key]
    if (!module.enable) return
    let models = fs.readdirSync(`./modules/${module.name}/model`)
    // console.log(models,'----')
    const files = models.filter(function (file) {
      return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
    }).map(file => file.substring(0, file.length - 3))


    files.forEach(function (file) {
      var model = sequelize.import(`../modules/${module.name}/model/${file}`);
      db[file] = model;
      // console.log(model,file,'------------')
    });
    // console.log(db)
    Object.keys(db).forEach(function (modelName) {
      if (db[modelName].associate) {
        // console.log(db[modelName],'relation darad wow !')
        db[modelName].associate(db);
      }
    });
  } catch (e) {
    if (e.code === 'ENOENT') {
      console.log('Module Model File not found!');
    } else {
      console.log(e)
    }

  }
})
// let models = fs.readdirSync('./models/tables')
  // models.forEach(modelFileName => {
  //     try {
  //         const modelKey = modelFileName.substring(0, modelFileName.length - 3)
  //         let file = sequelize.import(__dirname+`/tables/${modelKey}`);
  //         db[modelKey] = file;
  //         Object.keys(db).forEach(function(modelName) {
  //             if (db[modelName].associate) {
  //                 // console.log(db[modelName],'relation darad wow !')
  //                 db[modelName].associate(db);
  //             }
  //         });
  //     } catch (e) {
  //         if (e.code === 'ENOENT') {
  //             console.log('Module Model File not found!');
  //         } else {
  //             console.log(e)
  //         }
  //     }
  // })

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db
module.exports.createDatabase = createDatabase