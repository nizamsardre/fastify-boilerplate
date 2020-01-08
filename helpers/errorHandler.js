const config = require("_/config");
const NODE_ENV = process.env.NODE_ENV
const discord = require("_/helpers/discord");

function tgMessage(error,req){
  let message
  if(typeof req == 'string'){
      message = `${error}\n Function : ${req}  `
  }else{
      message = `${error}\n requested URL :  ${req.method} ${req.headers.host}${req.originalUrl}`
  }

  return message
}

const logIt = (req, error) => {

  try {
    // if (isProduction) {
      let msg = tgMessage(error, req);
      discord.sendMessage(msg) + '\n' + `server running on: ${NODE_ENV}`;
    // }
  } catch (e) {
    console.log("ERROR HAPPENED", e.code, e.message, "logIt");
  }
};
function errorHandlerMiddleware(err, req, res, next) {
  let message = "مشکلی پیش آمده است";
  console.log("error passed to errorHandlerMiddleware : " + err);
  logIt(req, err);
  // if (req.headers["accept"].includes("application/json")) {
    return res
      .status(500)
      .json({ success: false, message_id: 1, message: message });
  // }
  // res.render("error", { message: message });
}
module.exports = {
  logIt,
  errorHandlerMiddleware
};
