const userHelper = require('./helper/user')
const auth = require('_/helpers/auth')
const userRoleHelper = require('./helper/userRole')
const bcrypt = require('bcrypt');
let config = require('./config')
let adminRole = 1
const createAdmin = async(userName, email, password) => {
  let passwordHash = await bcrypt.hash(password, config.saltRounds)
  let body = { userName, email, password:passwordHash}
  let user = await userHelper.create(body)
  await userRoleHelper.create({
    userId: user.id,
    roleId:adminRole ,
  })
  console.log('user created')
}
console.log(process.argv)

createAdmin(process.argv[2],process.argv[3],process.argv[4])
// module.exports={createAdmin}