import { resolve, join } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export const entry = './src/index.js';
export const output = {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js'
};
export const module = {
    rules: [
        {
            test: [/\.js$/, /\.css$/],
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }
    ]
};
export const plugins = [
    new HtmlWebpackPlugin({
        template: './public/index.html',
    }),
];
export const devServer = {
    static: {
        directory: join(__dirname, 'dist'),
    },
    open: true,
};
export const mode = 'development';