'use strict';

const express = require('express');
const authRoutes = express.Router();
const { user } = require('./models/index');
const basicAuth = require('./basic.js');
const bearerAuth = require('./bearer');

authRoutes.post('/signup', async (req, res, next) => {
  try {
    let userRecord = await user.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    res.status(201).json(output);
  } catch (error) {
    next(error.message);
  }
});

authRoutes.post('/signin', basicAuth, (req, res, next) => {
  try {
    const user = {
      user: req.user,
      token: req.user.token,
    };
    res.status(200).json(user);
  } catch (error) {
    next(error.message);
  }
});

// authRoutes.get('/users', basicAuth, async (req, res, next) => {
//   const userRecord = await user.findAll({});
//   const list = userRecord.map(user => user.username);
//   res.status(200).json(list);
// });

module.exports = authRoutes;