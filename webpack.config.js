var webpack = require('webpack');
var HtmlWebPackPlugin = require('html-webpack-plugin');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin({
    name: 'commons',
    filename: 'common.js'
});
var path = require('path');
var port = process.env.PORT || 8012;
var srcPath = path.join(__dirname, 'src');
var outputPublicPath = "./";
var indexEntry = [
    srcPath + '/index.js'
];
var ProjectName = 'react-s-alert dev';

if (process.env.NODE_ENV === 'development') {
    indexEntry = [
        'webpack-dev-server/client?http://localhost:' + port + '/',
        'webpack/hot/only-dev-server',
        srcPath + '/index.js'
    ];
    outputPublicPath = 'http://localhost:' + port + '/build';
}

module.exports = {
    entry: {
        index: indexEntry
    },
    output:{
        publicPath: outputPublicPath,
        path: "./build" ,
        filename: "./[name].bundle.js",
        sourceMapFilename: "[file].map"
    },
    module:{
        loaders:[
            { test: /\.css$/, loader: "style-loader!css-loader"},
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', "stage-2"]
                },
                exclude: [/bower_components/, /node_modules/]
            }
        ]
    },
    resolve:{
        extensions: ['', '.js', '.jsx']
    },
    devtool: 'inline-source-map',
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebPackPlugin({
            inject: true,
            title: ProjectName,
            filename: 'index.html',
            template: srcPath + '/index.html',
            hash: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ],
    devServer:{
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true
    }
};