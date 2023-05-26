'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

const userModel = (sequelize, DataTypes) => {
  const model = sequelize.define('Users', {
    username: {type: DataTypes.STRING, required: true, unique: true},
    password: {type: DataTypes.STRING, required: true},
    role: {type: DataTypes.ENUM('user', 'admin'), required: true, defaultValue: 'user'},
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, SECRET);
      },
      set(tokenObj) {
        let token = jwt.sign(tokenObj, SECRET);
        return token;
      },
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          user: ['read', 'create'],
          admin: ['read', 'create', 'update', 'delete'],
        };
        return acl[this.role];
      },
    },
  });

  model.beforeCreate(async (user) => {
    let hashedPass = await bcrypt.hash(user.password, 5);
    user.password = hashedPass;
  });

  model.authenticateBasic = async function (username, password) {
    const user = await this.findOne({where: {username}});
    const valid = await bcrypt.compare(password, user.password);
    if(valid) { return user; }
    throw new Error('You do not exist!');
  };

  model.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, SECRET);
      const user = this.findOne({where: {username: parsedToken.username}});
      if(user) { return user; }
      throw new Error('Can not find you');
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return model;
};

module.exports = userModel;