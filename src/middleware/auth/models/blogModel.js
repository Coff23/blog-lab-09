'use strict';

const blogModel = (sequelize, DataTypes) => {
  const Blog = sequelize.define('Blogs', {
    author: DataTypes.STRING,
    content: DataTypes.STRING,
    // Other properties
  });

  Blog.associate = models => {
    Blog.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Blog;
};

module.exports = blogModel;