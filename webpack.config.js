const path = require('path');
const HtmlWebpackPluguin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

const devServer = (isDev) =>
  !isDev
    ? {}
    : {
        devServer: {
          open: true,
          hot: true,
          port: 8888,
        },
      };

module.exports = ({ develop }) => ({
  mode: develop ? 'development' : 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'main.js',
    assetModuleFilename: 'images/[hash][ext][query]',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPluguin({
      template: './src/index.html',
    }),
    new MiniCSSExtractPlugin({
      filename: './styles/main.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(?:ico|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.css$/i,
        use: [MiniCSSExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/i,
        use: [MiniCSSExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  ...devServer(develop),
});
