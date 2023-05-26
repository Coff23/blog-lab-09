'use srict';

const cors = require('cors');
const express = require('express');
const app = express();
const { authRoutes } = require('./middleware/auth/routes');
const notFoundHandler = require('./errorHandlers/404');
const errorHandler500 = require('./errorHandlers/500');

// Middleware
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRoutes);

app.get('/test', (req, res, next) => {
  res.status(200).send('working test server route');
});


//  Error Handling
app.use(errorHandler500);
app.use(notFoundHandler);


// Exports
module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  },
};