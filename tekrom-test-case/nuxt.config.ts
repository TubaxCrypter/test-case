// https://nuxt.com/docs/api/configuration/nuxt-config

export default {
    buildModules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
    ],
    modules: [
        '@nuxtjs/tailwindcss',
        ['@pinia/nuxt', { disableVuex: false }],

    ],
    build: {
        postcss: {
            plugins: {
                tailwindcss: {},
                autoprefixer: {},
            },
        },
    },
    css: [
        '@/assets/css/main.css',
    ],


}
