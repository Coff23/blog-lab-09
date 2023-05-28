'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./user');
const blogModel = require('./blogModel');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite::memory';
const sequelize = new Sequelize(DATABASE_URL);

const blog = blogModel(sequelize,DataTypes);
const user = userModel(sequelize, DataTypes);

user.hasMany(blog);
// blog.belongsTo(user);

module.exports = {
  db: sequelize,
  user,
  blog,
  
};