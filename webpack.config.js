import path from 'path';
import webpack from 'webpack';

export default {
  devtool: 'cheap-module-eval-source-map',
  context: __dirname,
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './client/index.js'
  ],
  output: {
    path: '/public',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.js$/, include: path.join(__dirname, 'client'), exclude: /node_modules/, loaders: ['react-hot-loader', 'babel-loader'] },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.(png|gif|jpg|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
    ]
  }
}
