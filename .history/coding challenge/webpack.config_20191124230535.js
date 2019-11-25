// module.exports = {
//   entry: ['@babel/polyfill', __dirname + '/client/index.jsx'],
//   module: {
//     rules: [
//       {
//         test: [/\.jsx$/],
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-react', '@babel/preset-env'],
//             plugins: [
//               [
//                 "@babel/plugin-proposal-class-properties"
//               ]
//             ],
//           }
//         }
//       } ,
//       {
//         test: /\.(css)$/,
//         use: ['style-loader', 'css-loader'],
//       }
//     ]
//   },
//    output: {
//     filename: 'App.js',
//     path: __dirname + '/public'
//   }
// };

const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const js = {
  test: [/\.js[x]?$/],
    exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
          plugins: [
            [
              "@babel/plugin-proposal-class-properties"
            ]
          ],
        }
      }
}

const css = {
  exclude: /node_modules/,
  test: /\.css$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: process.env.NODE_ENV === 'development',
        publicPath:  __dirname + '/public',
        reloadAll: true,
      }
    },
    'css-loader', 'style-loader',
  ]
}

const serverConfig = {
  mode: 'development',
  target: 'node',
  node: {
    __dirname: false
  },
  externals: [nodeExternals()],
  entry: {
    'index.js': './index.js'
  },
  module: {
    rules: [js,css]
  },
  output: {
    path: __dirname + '/public',
    filename: 'index.js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ]
}

const clientConfig = {
  mode: 'development',
  target: 'web',
  entry: {
    'index.jsx': __dirname + '/client/index.jsx'
  },
  module: {
    rules: [js,css]
  },
  output: {
    path: __dirname + '/public',
    filename: 'app.js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    })
  ]
}

module.exports = [serverConfig, clientConfig]