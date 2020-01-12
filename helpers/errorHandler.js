const config = require('_/config');
const NODE_ENV = process.env.NODE_ENV;
const discord = require('_/helpers/discord');

function tgMessage(error, req) {
  let message;
  if (typeof req == 'string') {
    message = `${error}\n Function : ${req}  `;
  } else {
    message = `${error}\n requested URL :  ${req.method} ${req.headers.host}${req.originalUrl}`;
  }

  return message;
}

const logIt = (req, error) => {
  try {
    let msg = tgMessage(error, req);
    discord.sendMessage(msg) + '\n' + `server running on: ${NODE_ENV}`;
  } catch (e) {
    console.log('ERROR HAPPENED', e.code, e.message, 'logIt');
  }
};
// fastify.setErrorHandler(function (error, request, reply) {
//   console.log(error.message,'hi')
//   request.log.warn(error)
//   var statusCode = error.statusCode >= 400 ? error.statusCode : 500
//   reply
//     .code(statusCode)
//     .type('text/plain')
//     .send(statusCode >= 500 ? 'Internal server error' : error.message)
// })

async function errorHandlerMiddleware(error, request, reply) {
  let message = 'مشکلی پیش آمده است';
  console.log('error passed to errorHandlerMiddleware : ' + error);
  if (process.env.production) logIt(request, error);
  return reply.code(500).send({ success: false, message_id: 1, message: message });
}
module.exports = {
  logIt,
  errorHandlerMiddleware
};
