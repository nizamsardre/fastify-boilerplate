const mongoose = require('mongoose');
const config = require('../config');

const runDB = () => {
  return mongoose.connect(config.db,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
};

module.exports=runDB