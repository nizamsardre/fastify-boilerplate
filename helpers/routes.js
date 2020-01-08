const fs = require('fs')
const modules = require('_/modules')
const registerRoutes = (fastify) => {

  Object.keys(modules).forEach(key => {

  try{
  const module = modules[key]
  if(!module.enable || !module.url) return
  let moduleName = module.name
  let controllers = fs.readdirSync(`./modules/${moduleName}/controller`)
  controllers.forEach(controller=>{
    const routers = require(`_/modules/${moduleName}/controller/${controller}`)
    fastify.register(routers,{prefix:`/app/api/v1/${module.url}`})
    // routers.forEach(router => {
    //   fastify.route(router, {}{prefix:`/app/api/v1/${module.url}`})
    // })



  })
}catch(e){
  console.log(e)
 }
})
}

module.exports={registerRoutes}