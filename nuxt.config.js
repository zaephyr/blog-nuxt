require('dotenv').config();
export default {
    // Target (https://go.nuxtjs.dev/config-target)
    target: 'server',

    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'blog-frontend',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            { hid: 'description', name: 'description', content: '' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: ['~/assets/main.scss'],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        // https://go.nuxtjs.dev/tailwindcss
        '@nuxtjs/tailwindcss',
        '@nuxtjs/dotenv',
    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        '@nuxtjs/cloudinary',
        // https://go.nuxtjs.dev/content
        '@nuxt/content',
        '@nuxtjs/auth',
        [
            'nuxt-fontawesome',
            {
                imports: [
                    {
                        set: '@fortawesome/free-solid-svg-icons',
                        icons: ['fas'],
                    },
                ],
            },
        ],
    ],

    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: {
        // baseURL: 'http://localhost:8080/api/v1/',
        baseURL: 'https://pacific-fjord-55363.herokuapp.com/api/v1/',
    },
    // Cloudinary module setup (https://cloudinary.nuxtjs.org/setup)
    cloudinary: {
        cloudName: process.env.CLOUDNAME,
        apiKey: process.env.API_KEY,
        apiSecret: process.env.API_SECRET,
        useComponent: true,
    },

    // Content module configuration (https://go.nuxtjs.dev/config-content)
    content: {},

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {},

    auth: {
        strategies: {
            local: {
                endpoints: {
                    login: {
                        url: '/auth/login',
                        method: 'post',
                        propertyName: 'token',
                    },
                    logout: { url: '/auth/logout', method: 'post' },
                    user: {
                        url: '/users/me',
                        method: 'get',
                        propertyName: false,
                    },
                },
                tokenRequired: true,
                tokenType: 'bearer',
                globalToken: true,
                autoFetchUser: true,
            },
        },
        redirect: {
            logout: '/blogs',
            home: '/blogs',
        },
    },
    serverMiddleware: ['~/serverMiddleware/redirects.js'],
};
