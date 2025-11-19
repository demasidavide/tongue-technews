const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:{
        index: './src/js/index.js'
    },
    output:{
        path: path.resolve(__dirname,'dist'),
        filename: 'main.js'
    },
    
    module:{ rules:[
        { 
            test: /\.css$/i, 
            use: ['style-loader','css-loader'] 
        },
        {
             test:/\.js$/i,
             exclude: /node_modules/,
             use: {
                loader: 'babel-loader',
                
                 options:{
                     presets:[['@babel/preset-env', {
                         modules: false
                     }]]
                     
                }
            }
        }
    ]},
    plugins:[
        new HtmlWebpackPlugin({
            title:'App webpack',
            template:'./src/index.html'
        })
    ],
    devServer:{
        port:5000,
        open:true,
        static:path.resolve(__dirname,'dist')
    },
    mode:'development'
};

