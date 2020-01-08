const db = require('_/models')
async function initApp() {
    try {
        await db.createDatabase().catch(e => console.log(e, 'err in initApp createDatabase function '))
      await db.sequelize.sync(
        // { force: true }
      )
    } catch (err) {
      console.log(`Sequelize issue:\nerr name :${err.name}\nerr message :  ${err.message}`);
    }
}

module.exports = {
    initApp
}