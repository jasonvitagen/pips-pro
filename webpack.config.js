const
    webpack = require('webpack')
    , webpackUglifyJsPlugin = require('webpack-uglify-js-plugin')
    , path = require('path');


require('dotenv').config({path: './process.env'});


module.exports = {
    entry   : './client.js',
    output  : {
        path     : __dirname + '/public/js',
        filename : 'bundle.js',
        publicPath : '/js'
    },
    module  : {
        loaders : [
            {
                test     : /\.js$/,
                exclude  : /node_modules/,
                loaders  : ['babel']
            }
        ]
    },
    devServer : {
        contentBase : './public'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'HOST': JSON.stringify(process.env.HOST),
                'RECAPTCHA_KEY': JSON.stringify(process.env.RECAPTCHA_KEY),
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpackUglifyJsPlugin({
            cacheFolder: path.resolve(__dirname, './public/webpack-cached/'),
            debug: true,
            minimize: true,
            sourceMap: false,
            output: {
                comments: false
            },
            compressor: {
                warnings: false
            }
        })
    ]
};