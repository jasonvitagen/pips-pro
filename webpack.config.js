const
    webpack = require('webpack');


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
                'HOST': `"${process.env.HOST}"`
            }
        })
    ]
};