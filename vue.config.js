module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/pwa-project/'
        : '/',

    pwa: {
        themeColor: "#42b983",
        msTileColor: "#42b983",
        appleMobileWebAppCache: "yes",
        manifestOptions: {
            background_color: "#42b983"
        }
    }
};