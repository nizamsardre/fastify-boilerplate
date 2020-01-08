const db = require('_/models')

async function findOrCreate(where,fields){
  return db.User.findOrCreate({
   where:where,
   defaults:fields
 })
}

async function findAll(where={}){
  return db.User.findAll({
   where:where
 })
}

async function findOne(where={}){
  return db.User.findOne({
   where:where
 })
}


async function findById(id){
  return db.User.findById(id)
}

async function findByIdWithRoles(id){
  return db.User.findById(id, {
    include: [
      { model: db.Role,through:{attributes:[]} }

    ]
  })
}

async function destroy(where={}){
  return db.User.destroy({
   where:where
 })
}

async function create(fields) {
  return db.User.create(fields)
}

module.exports = {
  create,
  findOrCreate,
  findAll,
  destroy,
  findById,
  findOne,
  findByIdWithRoles
}