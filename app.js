// Load the dotfiles.
require('dotenv').load({ silent: true });

const express = require('express');

// Middleware!
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');

// Webpack
const webpack = require('webpack');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config.js')

const app = express();
const port = process.env.PORT || 3000;

const setupDB = () => {
  const mongoose = require('mongoose');
  const database = process.env.DATABASE || process.env.MONGODB_URI || "mongodb://localhost:27017";

  const settingsConfig = require('./config/settings');
  const adminConfig = require('./config/admin');

  // Connect to mongodb
  mongoose.connect(database);

  return Promise.all([settingsConfig(), adminConfig()]);
};

const setupApp = () => {
  app.use(morgan('dev'));

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  app.use(methodOverride());

  app.use('/assets/', express.static(__dirname + '/app/client/assets'));

  if (process.env.NODE_ENV === 'development') {
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler, {
      publicPath: '/build/'
    }));
    app.use(webpackHotMiddleware(compiler));
  } else {
    app.use('/build/', express.static(__dirname + '/app/client/build'));
  }

  // Routers =====================================================================

  const apiRouter = express.Router();
  require('./app/server/routes/api')(apiRouter);
  app.use('/api', apiRouter);

  const authRouter = express.Router();
  require('./app/server/routes/auth')(authRouter);
  app.use('/auth', authRouter);

  require('./app/server/routes')(app);

  // listen (start app with node server.js) ======================================
  app.listen(port, '0.0.0.0');
  console.log("App listening on port " + port);
};

setupDB().then(setupApp);
