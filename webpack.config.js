const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const defaultConfig = {
  entry: path.resolve(__dirname, './source/app.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'polling-stations.js'
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: [ path.resolve(__dirname, 'node_modules') ],
        loader: 'babel-loader'
      },
      {
        test: /\.json/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Кандидаты «Штаба Зюзино» по избирательным участкам',
      template: path.resolve(__dirname, './source/index.ejs')
    })
  ]
};

const developmentConfig = Object.assign(defaultConfig, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './build'
  }
});

module.exports = (env) => {
  console.log('env?', env);
  return env && env.dev ? developmentConfig : defaultConfig;
};
