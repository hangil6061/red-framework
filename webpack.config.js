const path = require('path');

module.exports = {
    // context: __dirname + '/app', // 모듈 파일 폴더
    entry: { // 엔트리 파일 목록
        main: './test/main.ts'
    },
    output: {
        path: __dirname + '/dist', // 번들 파일 폴더,
        publicPath: '/dist/',
        filename: 'game.js' // 번들 파일 이름 규칙
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname),
                exclude: /(node_modules)|(dist)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.ts$/,
                use: ['ts-loader']
            }
        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    devServer: {
        compress: true,
        inline: true,
        port: 9000,
        open : true
    }
};
