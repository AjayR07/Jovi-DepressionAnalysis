const Dotenv = require('dotenv-webpack');
module.exports = {
    configureWebpack: {
        plugins: [
            new Dotenv()
        ]
    },
    publicPath: process.env.BASE_URL,
    assetsDir: process.env.BASE_URL,
};