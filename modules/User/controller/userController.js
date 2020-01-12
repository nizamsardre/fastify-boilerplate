
const jwt = require('jsonwebtoken')
const userHelper = require('../helper/user')
let config = require('../config')

const routes = (fastify, opts, next) => {
  fastify.post('/', createUser)
  fastify.get('/', getUser)
  next()

}
async function createUser(req, reply,next) {
  let { userName, email, password,fname,lname } = req.body
  if (!userName || !email || !password) return reply.code(400).send({ success: false, message: 'فیلد های الزامی تکمیل نشده است', message_id: 2 })
  try {
    let userExists = await userHelper.findOne({
      userName:userName
    })
    if(userExists) return reply.code(400).send({ success: false, message: 'این نام کاربری ثبت شده است', message_id: 3 })
    let body = { userName, email,fname,lname }
    let user = await userHelper.create(body)
    let token = await jwt.sign({ user }, config.jwtSecret)
    return {
      token: token,
      success:true
    }
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


module.exports = routes