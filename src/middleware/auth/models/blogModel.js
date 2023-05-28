'use strict';

const blogModel = (sequelize, DataTypes) => sequelize.define('Blogs', {
  author: DataTypes.STRING,
  content: DataTypes.STRING,
});

module.exports = blogModel;