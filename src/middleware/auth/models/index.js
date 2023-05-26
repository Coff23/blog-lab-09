'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./user');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite::memory';

const sequelize = new Sequelize(DATABASE_URL);
const user = userModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  user,
};