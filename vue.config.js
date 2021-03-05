module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/pwa-project/'
        : '/',

    pwa: {
        themeColor: "#3949AB",
        msTileColor: "#3949AB",
        appleMobileWebAppCache: "yes",
        manifestOptions: {
            background_color: "#3949AB"
        }
    },

    transpileDependencies: [
        'vuetify'
    ]
}
