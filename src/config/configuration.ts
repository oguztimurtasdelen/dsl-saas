export default () => ({
    system: {
        environment: process.env.ENVIRONMENT || 'DEVELOPMENT',
        app_version: '1.0', 
    },
    server: {
        url: process.env.SERVER_URL,
        port: parseInt(process.env.PORT, 10) || 3000,
    },
    database: {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        name: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD
    },
    mongoDB: {
        url: process.env.MONGO_URI
    }
})