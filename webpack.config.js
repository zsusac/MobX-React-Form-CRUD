var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/index.jsx', 
    devtool: 'cheap-module-source-map', 
    cache: true, 
    debug: true, 
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
        }]
    }
};
