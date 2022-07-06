const path = require('path');
const bundleFolder = "./production/";
const publicFolder = "./production/";
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
let mode = 'development';
if (process.env.NODE_ENV === 'production') { 
    mode = 'production';
}

const optimization = () => {
   const config = {};

    if (isProd) {
        config.minimizer = [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    }
    return config;
};

module.exports = {
    mode: mode,
    entry: {
        site: './src/index.tsx',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, bundleFolder),
        clean: true,
        publicPath: '/',
        assetModuleFilename: 'assets/images/[name][ext]'
    },
    devtool: isProd ? false : 'inline-source-map',
    optimization: optimization(),
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new HtmlWebpackPlugin({
            template: './assets/index.html',
            filename: 'index.html',
            path: '/production/',
            chunks: ['site']
        }),
        new CopyPlugin({
            patterns: [
              { from: './assets/ckeditor/', to: './ckeditor/' }
            ],
          }),
        new ESLintPlugin()
    ],
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
      },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {                    
                    presets: [
                        '@babel/preset-env'
                    ]
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            /*{
                test: /\.(png|jpg|svg|gif)$/,
                loader: 'file-loader',
                options: {
                    publicPath: '../',
                    name: `assets/images/[name].[ext]`,
                }
            },*/
            {
                test: /^(?!.*?\.module).*\.css$/,
                use: [
                    {
                        loader: isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                    }, 'css-loader'
                ]
            },
            {
                test: /^(?!.*?\.module).*\.less$/,
                use: [
                    {
                        loader: isDev ? "style-loader" : MiniCssExtractPlugin.loader,

                    }, "css-loader",
                    'less-loader'
                ]
            },
            {
                test: /\.module\.css$/,
                use: [
                    {
                        loader: isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {},
                            esModule: true
                        },
                    }
                ]
            },
            {
                test: /\.module\.less$/,
                use: [
                    {
                        loader: isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {},
                            esModule: true
                        },
                    },
                    'less-loader'
                ]
            },
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, publicFolder),
        },
        port: 3000,
        historyApiFallback: true,
    }
};
