// https://nuxt.com/docs/api/configuration/nuxt-config

export default {
    buildModules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
    ],
    modules: [
        '@nuxtjs/tailwindcss',
        ['@pinia/nuxt', { disableVuex: false }],
        // '@nuxtjs/i18n',
    ],
    build: {
        postcss: {
            plugins: {
                tailwindcss: {},
                autoprefixer: {},
            },
        },
    },

    // i18n: {
    //     locales: ['en', 'tr'],
    //     defaultLocale: 'en',
    //     vueI18n: {
    //         fallbackLocale: 'en',
    //         messages: {
    //             en: {
    //                 welcome: 'Welcome'
    //             },
    //             tr: {
    //                 welcome: 'Bienvenue'
    //             },
    //
    //         }
    //     }
    // },

    css: [
        '@/assets/css/main.css',
    ],


}
