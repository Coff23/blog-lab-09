'use strict';

const express = require('express');
const authRoutes = express.Router();
const { user, blog } = require('./models/index');
const basicAuth = require('./basic.js');
const bearerAuth = require('./bearer');
const acl = require('./acl');

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

authRoutes.get('/users', async (req, res, next) => {
  const userRecord = await user.findAll({ include: blog });
  // const list = userRecord.map(user => `Name: ${user.username} ID: ${user.id}`);
  res.status(200).json(userRecord);
});

authRoutes.get('/user/:id', async (req, res, next) => {
  const singleUser = await user.findOne({where: {id: req.params.id}});

  res.status(200).send(singleUser);
});

authRoutes.put('/user/:id', bearerAuth, async (req, res, next) => {
  const id = req.params.id;
  const obj = req.body;
  let updateUser = await user.findOne({where:{id}});
  let updatedUser = await updateUser.update(obj);
  res.status(201).json(updatedUser);
});

authRoutes.delete('/user/:id', bearerAuth, acl('delete'), async (req, res, next) => {
  console.log(req.user);
  const deletedUser = await user.findOne({ where: { id: req.params.id } });
  console.log(deletedUser);
  await deletedUser.destroy();
  res.status(200).send(deletedUser);
  
});

module.exports = authRoutes;