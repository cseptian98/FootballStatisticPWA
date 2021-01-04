const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
   entry: {
      index: './src/index.js',
      team: './src/team.js',
   },
   output: {
      filename: '[name].js',
      path: __dirname + '/dist',
   },
   module: {
      rules: {
         test: /\.css$/,
         use: [
            {
               loader: 'style-loader',
            },
            {
               loader: 'css-loader',
            },
         ],
      },
   },
   plugins: [
      new HTMLWebpackPlugin({
         template: './src/index.html',
         filename: 'index.html',
      }),
      new WebpackPwaManifest({
         name: 'Football Statistic',
         short_name: 'FootStats',
         description: 'Football Statistic for Premier League & Ligue1',
         gcm_sender_id: '41247971606',
         display: 'standalone',
         background_color: '#002171',
         theme_color: '#002171',
         icons: [
            {
               src: '/img/icon-512.png',
               sizes: '512x512',
               type: 'image/png',
            },
            {
               src: '/img/icon-192.png',
               sizes: '192x192',
               type: 'image/png',
            },
            {
               src: '/img/maskable_icon-192.png',
               sizes: '192x192',
               type: 'image/png',
               purpose: 'any maskable',
            },
            {
               src: '/img/icon-128.png',
               sizes: '128x128',
               type: 'image/png',
            },
         ],
      }),
      new ServiceWorkerWebpackPlugin({
         entry: path.join(__dirname, './src/service-worker.js'),
      }),
      new CopyPlugin({
         patterns: [
            { from: './src/team.html', to: '' },
            { from: './src/nav.html', to: '' },
            { from: './src/css', to: 'css' },
            { from: './src/images', to: 'images' },
            { from: './src/js', to: 'js' },
            { from: './src/pages', to: 'pages' },
         ],
      }),
   ],
};
