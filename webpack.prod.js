const { merge } = require('webpack-merge');
const common = require('./webpack.common');
// const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const LicenseWebpackPlugin = require('license-webpack-plugin').LicenseWebpackPlugin;
const TerserPlugin = require('terser-webpack-plugin');




module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: /@license/i,
          },
        },
        extractComments: true,
      })
      ]  
  },
  // optimization: {
  //   minimize: true,
  //   minimizer: [
  //     new TerserPlugin({})]
  // },
}); 

