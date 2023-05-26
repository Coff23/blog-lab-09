'use strict';


require('dotenv').config();
const server = require('./src/server');
const PORT = process.env.PORT || 3002;
const{ db } = require('./src/middleware/auth/models');

db.sync()
  .then(()=> {
    server.start(PORT);
  });
