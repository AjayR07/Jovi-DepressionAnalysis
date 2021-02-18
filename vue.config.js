const Dotenv = require('dotenv-webpack');
module.exports = {
    configureWebpack: {
        plugins: [
            new Dotenv()
        ]
    },
    publicPath: process.env.BASE_URL,
    assetsDir: process.env.BASE_URL,
    transpileDependencies: [
      'vuetify'
    ],
    pwa: {
        name: 'Jovi',
        themeColor: '#1e355e',
        msTileColor: '#000000',
        display: "standalone",
        offline_enables: "true",
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        workboxPluginMode: "InjectManifest",
        workboxOptions: {
            swSrc: "src/service-worker.js",
        }
    },
};
