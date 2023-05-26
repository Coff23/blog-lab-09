const { users } = require('./models/user');

module.exports = async (res, req, next) => {
  try {
    if (!req.headers.authorization) { next('Invalid Login'); }

    const token = req.header.authorization.split(' ').pop();
    const valid = await users.authenticateToken(token);

    req.user = valid;
    req.token = valid.token;
    next();
  }
  catch (error) {
    console.error(error);
    res.status(403).send('Invalid Login');
  }

};