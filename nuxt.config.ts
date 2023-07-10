import axios from "axios";
import { getApiUrl } from "lib/api";

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
    ],
    ssr: false,
    generate: {
        routes: [
            "/dashboard/[id]",
            "/editpage/[id]",
            "/place/[id]",
            "/itinerary/[id]",
        ]
    }
})
