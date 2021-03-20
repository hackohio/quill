// Load the dotfiles.
require("dotenv").load({ silent: true });

const express = require("express");

// Middleware!
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const session = require("express-session");

const app = express();
const port = process.env.PORT || 3000;

const isDevelopmentMode = process.env.NODE_ENV == "development";

const setupDB = () => {
  const mongoose = require("mongoose");
  const database =
    process.env.DATABASE ||
    process.env.MONGODB_URI ||
    "mongodb://localhost:27017";

  const settingsConfig = require("./config/settings");
  const adminConfig = require("./config/admin");

  // Connect to mongodb
  mongoose.connect(database);

  return Promise.all([settingsConfig(), adminConfig()]);
};

const setupApp = () => {
  app.use(morgan("dev"));

  app.use(express.urlencoded());
  app.use(express.json());

  // Use the session middleware
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      cookie: {
        httpOnly: true,
        maxAge: 60000,
        sameSite: "Lax",
        secure: !isDevelopmentMode,
      },
    })
  );

  app.use("/assets/", express.static(__dirname + "/app/client/assets"));

  if (isDevelopmentMode) {
    // Webpack
    const webpack = require("webpack");
    const webpackConfig = require("./webpack.config.js");
    const webpackHotMiddleware = require("webpack-hot-middleware");
    const webpackDevMiddleware = require("webpack-dev-middleware");
    const compiler = webpack(webpackConfig);
    app.use(
      webpackDevMiddleware(compiler, {
        publicPath: "/build/",
      })
    );
    app.use(webpackHotMiddleware(compiler));
  } else {
    // Production Settings
    app.set("trust proxy", 1); // trust first proxy
    // Use prebuilt webpack bundles
    app.use("/build/", express.static(__dirname + "/app/client/build"));
  }

  // Routers =====================================================================

  const apiRouter = express.Router();
  require("./app/server/routes/api")(apiRouter);
  app.use("/api", apiRouter);

  const authRouter = express.Router();
  require("./app/server/routes/auth")(authRouter);
  app.use("/auth", authRouter);

  require("./app/server/routes")(app);

  // listen (start app with node server.js) ======================================
  app.listen(port, "0.0.0.0");
  console.log("App listening on port " + port);
};

setupDB().then(setupApp);
