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
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const path = require('path')
const extractCSS = new ExtractTextPlugin(__dirname + '/public/styles.css');
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
  test: /\.css$/,
  exclude: /node_modules/,
  loader: ExtractTextPlugin.extract({
    fallback: "style-loader",
    // use: "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]--[hash:base64:5]"
  })
}



const serverConfig = {
  mode: 'development',
  target: 'node',
  node: {
    __dirname: false
  },
  externals: [nodeExternals()],
  entry: {
    'index.js': __dirname + '/server/index.js'
  },
  module: {
    rules: [js,css]
  },
  output: {
    path: __dirname + '/public',
    filename: 'index.js'
  },
  plugins: [
    new ExtractTextPlugin(__dirname + '/public/styles.css'),
  ]
}

const clientConfig = {
  mode: 'development',
  target: 'web',
  entry: {
    'app.jsx': __dirname + '/client/app.jsx'
  },
  module: {
    rules: [js,css]
  },
  output: {
    path: __dirname + '/public',
    filename: 'app.jsx'
  },
  plugins: [
    new ExtractTextPlugin(__dirname + '/public/styles.css'),
  ]
}

module.exports = [serverConfig, clientConfig]