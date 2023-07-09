// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    build: {
        transpile: ['chart.js']
    },
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
                },
                {
                    rel: 'stylesheet',
                    href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
                    crossorigin: ''
                }
            ]
        }
    },
    modules: [
        '@pinia/nuxt',
        '@vueuse/nuxt'
    ]
})
