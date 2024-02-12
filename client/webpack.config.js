const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Plugin to generate main HTML file with injected script tags
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Jate - Just Another Text Editor',
      }),

      // Plugin to inject a service worker into the build and precache assets
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),

      // Plugin to generate a Web App Manifest for PWA
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Jate',
        short_name: 'Jate',
        description: 'Just another text editor!',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        // Rule to handle CSS files using style-loader and css-loader
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        // Rule to transpile JavaScript using Babel
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // We use babel-loader in order to use ES6.
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
