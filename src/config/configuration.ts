import { DatabaseConfigModel } from "src/modules/database/config.model";


export default () => ({
    system: {
        environment: process.env.ENVIRONMENT || 'DEVELOPMENT',
        app_version: process.env.APPVERSION, 
    },
    server: {
        url: process.env.SERVER_URL,
        port: parseInt(process.env.PORT, 10) || 3000, 
        allowed_origins: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split('###') : null,
    },
    database: <DatabaseConfigModel>{
        type: process.env.DATABASE_TYPE,
        uri: process.env.DATABASE_URI,
        port: parseInt(process.env.DATABASE_PORT, 10) || 0,
        name: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD
   },
})