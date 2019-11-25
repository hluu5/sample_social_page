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

const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
// const path = require('path')

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
          test: /\.(css)$/,
          use: ['style-loader', 'css-loader'],
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
    path: __dirname + 'public',
    filename: 'index.js'
  }
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
  }
}

module.exports = [serverConfig, clientConfig]