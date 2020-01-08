// let publicPath = '_/public/uploads/images'

 const db = require('_/models')
 const mime = require('mime')
 var fs = require('fs')
 const multer = require('multer')
// const Pool = require('threads').Pool;
// const pool = new Pool();

// const resizeImageWorker = pool.run((args, done) => {
//   let { input, output, size } = args
//   const jimp = require("jimp");
//   jimp.read(input, (err, image) => {
//     if (err) done({ success: false })
//     if(!size.h)  size.h = jimp.AUTO
//     image.resize(size.w,size.h)
//       .write(output, () => {
//         done('done')
//       })
//   })
// })
const resizeImageNoneWorker = ((input, output, size) => {
  return new Promise((resolve, reject) => {
    // let { input, output, size } = args
    const jimp = require("jimp");
    jimp.read(input, (err, image) => {
      if (err) reject({ success: false })
      if(!size.h)  size.h = jimp.AUTO
      image.resize(size.w,size.h)
        .write(output, () => {
          resolve('done')
        })
    })
  })
})
const resizeImage = (input,output,size) => {
  return new Promise(function (resolve, reject) {
    resizeImageWorker
      .send({ input, output, size })
      .on('finished', function() {
        console.log('Everything done, shutting down the thread pool.');
        resizeImageWorker.killAll();
      })
    .on('done', function(response) {
        // resizeImageWorker.killAll();
        resolve({success:true})
    })
    .on('error', function(error) {
        console.error('Worker errored:', error);
        // reject(error)
    })

    .on('exit', function() {
      console.log('Worker has been terminated.');
              reject(error)
    })
})
}
// (async () => {
//   console.time('s')
//   let sizes = [
//     {w:150,h:150},
//     {w:350,h:350},
//     {w:450,h:450},
//     {w:800,h:800},
//   ]

//   let promises = sizes.map(async size => {
//     let input = 'public/uploads/images/galleries/115727.jpeg'
//     let output = `public/uploads/images/galleries/thumbs/115727150-${size.w}.jpeg`
//     return resizeImage(input,output,size)
//   })
//   let result = await Promise.all(promises)
//   console.log(result)
//   console.timeEnd('s')
//   // image.write('public/uploads/images/galleries/thumbs/115727.jpeg')
// })()

function fileFilter(req, file, cb) {
  console.log(fileFilter,'',file.mimetype)
const baseFormats = ['image/png', 'image/jpeg']
const multerFormats = req.multerFormats ? (Array.isArray(req.multerFormats) ? req.multerFormats:[]):[]
const authorizedFormats = [...baseFormats, ...multerFormats]
  console.log(authorizedFormats)
  if (authorizedFormats.includes(file.mimetype)) {
      cb(null, true)
  } else {
      console.log('inja')
      cb('فرمت تصویر مجاز نمیباشد',false)
  }
}

function ImageUploadAndCrop(req, res, type) {
  return new Promise((resolve, reject) => {
      let upload = getMulter(type)
      upload(req, res, function (err, data) {
          if (err) {
              return reject(err)
          }
          if (req.file == undefined) {
              return res.status(400).json({ success: false, message_id: 10, message: 'تصویری ارسال نشده است' })
          }
          let imageName = req.file.filename
          crop(imageName,type,type).then(function(data){
              if(data.success) return resolve(data)
              reject(new Error('success is false'))
          }).catch(function(e){
              reject(e)
          })
      })
  })
}

function getMulter(type,inputName='avatar'){
  if(!type) throw new Error('no type in args, getMulter FUNCTION')
  var storage = multer.diskStorage({
      destination: function (req, file, cb) {
          switch(type){
              case 'doctors':
              cb(null, `public/img/uploads/doctors`)
              break
              case 'patients':
              cb(null, `public/img/uploads/patients`)
              break
              case 'secretaries':
              cb(null, `public/img/uploads/doctors`)
              break
              default :
              throw new Error('switch case got default !, getMulter FUNCTION',type)
          }

      },
      filename: function (req, file, cb) {

        let extenstion = mime.getExtension(file.mimetype)
        cb(null,  Math.round(Math.random() * 785542)   + '.' + extenstion)
      }
    })
    var upload = multer({ storage: storage,fileFilter:fileFilter }).single(inputName)
    return upload
}



function uploadImage(directory,inputName='avatar'){
    if(!directory) throw new Error('no directory in args, uploadImage FUNCTION')
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, directory)

        },
        filename: function (req, file, cb) {
          if(file.mimetype == 'audio/mpeg')return cb(null,  Math.round(Math.random() * 785542)   + '.' + 'mp3')
          let extenstion = mime.getExtension(file.mimetype)
          let fileName = Math.round(Math.random() * 785542) + '.' + extenstion
          // let data = {extenstion,fileName}
          cb(null,  fileName)
        }
      })
      var upload = multer({ storage: storage,fileFilter:fileFilter }).single(inputName)
      return upload
}
const getExtension = (file) => {
  return  mime.getExtension(file)
}
module.exports = {
  uploadImage: uploadImage,
  resizeImage,
  getExtension,
  resizeImageNoneWorker
}

