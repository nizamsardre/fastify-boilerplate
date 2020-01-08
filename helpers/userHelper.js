const db = require('../models')
async function getUser(id){


let user = await db.User.findById(id)
return user
}
(async () => {
  try {

  // let article = await db.SubCategory.findAll({
  //   include: [
  //     {
  //       model: db.Category,
  //       // model:db.SubCategory
  //       include: [
  //         {model:db.Article}
  //       ]
  //     }
  //   ]
  // })
  // let article = await db.Article.findAll({
  //   include: [
  //     {model:db.ProductPostField},
  //     {
  //       model: db.Category,
  //       // model:db.SubCategory
  //       include: [
  //         {model:db.SubCategory}
  //       ]
  //     }
  //   ]
  // })
  // let article = await db.Category.findAll({
  //   include: [
  //     {
  //       model: db.SubCategory,
  //       include: [
  //         {model:db.Article}
  //       ]
  //     }
  //     ,
  //     // {model: db.SubCategory, required: false}
  //   ]
  // })

  // console.log(JSON.stringify(article), '-----')

} catch (error) {
    console.log(error)
}
})();
module.exports = {getUser}