// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
typescript: {
typeCheck: {
memoryLimit: 4096,
workers: 2,
},
})
