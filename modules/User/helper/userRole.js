const db = require('_/models')

async function findOrCreate(where,fields){
  return db.UserRole.findOrCreate({
   where:where,
   defaults:fields
 })
}

async function findAll(where={}){
  return db.UserRole.findAll({
   where:where
 })
}

async function findById(id){
  return db.UserRole.findById(id)
}

async function destroy(where={}){
  return db.UserRole.destroy({
   where:where
 })
}

async function create(fields) {
  return db.UserRole.create(fields)
}

module.exports = {
  create,
  findOrCreate,
  findAll,
  destroy,
  findById
}