// const fastify = require('fastify')()

// // const jwt = require('jsonwebtoken')
// // const userHelper = require('../helper/user')
// // const userRoleHelper = require('../helper/userRole')
// // const bcrypt = require('bcrypt');
// // let config = require('../config')
// // let userController = express.Router();
// const routes = [
//   {
//   method: 'POST',
//   url:'/',
//   handler:createUser
//   },
//   {
//     method: 'GET',
//     url:'/',
//     handler:getUser
//     }
// ]
module.exports = (fastify, opts, next) {
async function createUser(req, res,next) {
  let { userName, email, password,fname,lname } = req.body
  if (!userName || !email || !password) return res.status(400).json({ success: false, message: 'فیلد های الزامی تکمیل نشده است', message_id: 2 })
  try {
    // let userExists = await userHelper.findAll({
    //   userName:userName
    // })
    // if(userExists.length>0) return res.status(400).json({ success: false, message: 'این نام کاربری ثبت شده است', message_id: 3 })
    // let passwordHash = await bcrypt.hash(password, config.saltRounds)
    // let body = { userName, email, password:passwordHash,fname,lname }
    // let user = await userHelper.create(body)
    // await userRoleHelper.create({
    //   userId: user.id,
    //   roleId:2 ,
    // })
    // user = await userHelper.findByIdWithRoles(user.id)
    // let token = await jwt.sign({ user }, config.jwtSecret)
    return res.status(200).json({hi:1})
  } catch (e) {
    console.log(e)
    next(e)
  }
}
async function getUser(req, res,next) {
  try {

    return {hi:true}
  } catch (e) {
    console.log(e)
    next(e)
  }
}

}

// module.exports = routes
