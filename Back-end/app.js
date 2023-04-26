const express = require('express');
const app = express();
const cors = require('cors');
const router = require("./Routes/api/users");
const AppError = require("./utils/apperror");
const errorHandler = require("./utils/errorHandler");
const bodyParser = require('body-parser');
const userController = require('./controllers/UserController');
const api = '/api';

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.all("*", (req, res, next) => {
 next(new AppError(`The URL ${req.originalUrl} 
 does not exists`, 404));
});
// app.use('/users', require ('router/users.js'));

app.use(errorHandler);
 
// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
module.exports = app;