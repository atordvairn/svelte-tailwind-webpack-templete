const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

module.exports = {
  entry: {
    "build/bundle": ["./src/main.js"],
  },
  resolve: {
    fallback: {
      crypto: false,
    },
    alias: {
      svelte: path.dirname(require.resolve("svelte/package.json")),
    },
    extensions: [".mjs", ".js", ".svelte"],
    mainFields: ["svelte", "browser", "module", "main"],
  },
  output: {
    path: path.join(__dirname, "/public"),
    filename: "[name].js",
    chunkFilename: "[name].[id].js",
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: "svelte-loader",
          options: {
            compilerOptions: {
              dev: !prod,
            },
            emitCss: prod,
            hotReload: !prod,
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        // required to prevent errors from Svelte on Webpack 5+
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  optimization: {
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  mode,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  devtool: prod ? false : "source-map",
  devServer: {
    allowedHosts: "all",
    hot: true,
    port: 9090,
  },
};
