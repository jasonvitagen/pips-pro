const webpack = require('webpack'),
    webpackUglifyJsPlugin = require('webpack-uglify-js-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin');
path = require('path');

require('dotenv').config({path: './process.env'});

const PATHS = {
    public: path.resolve(__dirname, 'public'),
    build: path.resolve(__dirname, 'dist')
};

const config = {
    entry: {
        'js/bundle': './client.js',
        'js/transactions': './public/my-account/transactions.js',
        'js/boss': './public/boss/index.js'
    },
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    devServer: {
        contentBase: './public',
        outputPath: PATHS.build
    },
    plugins: [
        new CleanWebpackPlugin([
            path.join(PATHS.public, 'webpack-cached'),
            PATHS.build
        ]),
        new CopyWebpackPlugin([
            {
                from: 'public/',
                to: PATHS.build
            }
        ]),
        new webpack.DefinePlugin({
            'process.env': {
                HOST: JSON.stringify(process.env.HOST),
                RECAPTCHA_KEY: JSON.stringify(process.env.RECAPTCHA_KEY),
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                PRICE_1_MONTH: JSON.stringify(process.env.PRICE_1_MONTH),
                PRICE_3_MONTH: JSON.stringify(process.env.PRICE_3_MONTH),
                PRICE_6_MONTH: JSON.stringify(process.env.PRICE_6_MONTH)
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
    );
}

module.exports = config;
