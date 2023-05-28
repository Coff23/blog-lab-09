'use srict';

const cors = require('cors');
const express = require('express');
const authRoutes = require('./middleware/auth/routes');
const notFoundHandler = require('./errorHandlers/404');
const errorHandler500 = require('./errorHandlers/500');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.get('/test', (req, res, next) => {
  res.status(200).send('working test server route');
});

app.use(authRoutes);
app.use(blogRoutes);

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