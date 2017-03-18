const
    webpack = require('webpack')
    , webpackUglifyJsPlugin = require('webpack-uglify-js-plugin')
    , path = require('path');


require('dotenv').config({path: './process.env'});


const config = {
    entry   : {
        bundle: './client.js',
        transactions: './public/my-account/transactions.js'
    },
    output  : {
        path     : __dirname + '/public/js',
        filename : '[name].js',
        publicPath : '/js'
    },
    module  : {
        rules : [
            {
                test     : /\.js$/,
                exclude  : /node_modules/,
                use  : ['babel-loader']
            },
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
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
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
    )
}

module.exports = config;