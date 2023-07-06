// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            link: [
                {
                    rel: 'stylesheet',
                    href: '/reset.css',
                    crossorigin: ''
                },
                {
                    rel: 'stylesheet',
                    href: '/theme.css',
                    crossorigin: ''
                }
            ]
        }
    },
    modules: [
        '@pinia/nuxt',
    ],
})
