var jwt = require('jsonwebtoken');
const config = require('_/modules/User/config')
const checkToken =  (req, res, next)  => {
  var token = req.cookies.token || req.query.token || req.headers['x-access-token']

  console.log(`token az client oumade : ${token}`)
  // if (token === undefined) {
  //   return   res.status(401).json({success: false, message: "Requires authentication"})
  // }
  if (token) {
    jwt.verify(token, config.jwtSecret, function (err, decoded) {
          if(err){
            req.noToken = true
            console.log('token error : ', err)
            if (err.name && err.name == 'TokenExpiredError') {
              return res.status(403).json({ success: false, messsage: 'token expired',message_id:110 })
            }
            // tl.sendMessage(messages.tgMessage(err, req), 'EMERGENCY')

            return next()
              // res.status(503).json({success: false, message: "Error while authentication"})
        }
          let a = JSON.stringify(decoded)
          // console.log(`token decode shode : ${a}`)
          try {
            if(decoded.roles == null) return res.status(403).json({success:false,messsage:'bad request'})
              req.xToken = token
              req.roles = decoded.roles
            if(Object.keys(decoded).includes('data')){
              // console.log(decoded)
              req.userId = decoded.data.user.id
              req.username = decoded.username
            }
          }catch(error){
            console.log(error,'token error catch')
            return res.status(401).json({success:false,message:'token mismatch'})
          }
            next()
      })


  }else{
    req.noToken = true
    next()
  }
}

const isAdmin = (req,res,next)=>{
  if(req.noToken){
        return res.status(401).json({success:false,message: 'client has no token in request '})
  }
  console.log(req.roles + req.userId)
  if(req.userId && req.roles.indexOf('admin') != '-1'){
    next()
  }else{
        return res.status(403).json({success: false, message: 'not authorized, user is not admin'})
  }

}
module.exports = {
  checkToken,
  isAdmin
}