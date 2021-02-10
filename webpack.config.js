const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const webpack = require("webpack");

const isDevelopment = process.env.NODE_ENV !== "production";

const generateImports = importModule => [
  "webpack-hot-middleware/client",
  "regenerator-runtime/runtime",
  importModule,
];

module.exports = {
  mode: isDevelopment ? "development" : "production",
  entry: {
    app: {
      import: generateImports(path.join(__dirname, "app/client/src/app.js")),
    },
    login: {
      import: generateImports(path.join(__dirname, "app/client/src/login.js")),
    },
  },
  module: {
    rules: [
      {
        test: /\.([jt]sx?)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              isDevelopment && require.resolve("react-refresh/babel"),
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.css$/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".ts", ".tsx", ".js", ".jsx"],
    alias: { "react-dom": "@hot-loader/react-dom" },
  },
  output: {
    path: path.join(__dirname, "app/client/build"),
    publicPath: "/build/",
    filename: "[name].js",
  },
  plugins: [
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  devServer: {
    hot: true,
    historyApiFallback: true,
  },
  devtool: "source-map",
};
