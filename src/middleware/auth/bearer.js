'use strict';

const { user } = require('./models/index');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) { next('Invalid Login no auth header'); }

    const token = req.headers.authorization.split(' ').pop();
    const valid = await user.authenticateToken(token);

    req.user = valid;
    req.token = valid.token;
    next();
  }
  catch (error) {
    console.error(error);
    res.status(403).send('Invalid Login not valid token??');
  }

};