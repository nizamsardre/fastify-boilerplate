const {model:userModel} = require('../model/User')
 const update = (id,doc) => {
  return userModel.updateOne({_id:id},doc).exec()

}

 const findOne = (where,populate=[]) => {
  return userModel.findOne(where).populate(populate)

}

 const create = (doc) => {
  return userModel.create(doc)

}

module.exports = {
  create,
  findOne,
  update
}