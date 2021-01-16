const paths = require('./paths');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const cssLoaders = (extra) => {
  const loaders = [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        sourceMap: false,
      },
    },
    'postcss-loader',
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

console.log('paths: ', paths);

module.exports = merge(common, {
  // Set the mode to development or production
  // Установка режима разработки или продакшна
  mode: 'development',

  // Control how source maps are generated
  // Управление созданием карт источников
  //devtool: 'inline-source-map',

  // Where webpack outputs the assets and bundles
  // Куда помещаются файлы сборки
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
  },

  // Spin up a server for quick development
  // Запуск сервера для разработки
  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    open: true,
    compress: true,
    hot: true,
    port: 2020,
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/i,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.css$/i,
        use: cssLoaders(),
      },
      {
        test: /\.less$/i,
        use: cssLoaders('less-loader'),
      },
    ],
  },
  plugins: [
    // Only update what has changed on hot reload
    // Обновлять только при "горячей" перезагрузке
    new webpack.HotModuleReplacementPlugin(),
    // Generates an HTML file from a template
    // Создание HTML-файла на основе шаблона
    new HtmlWebpackPlugin({
      // template file
      // шаблон
      template: paths.src + '/index.html',
      filename: 'index.html', // output file
    }),
  ],
});
