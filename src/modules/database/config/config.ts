import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { DatabaseConfigModel } from "../config.model"

export default (env: string, param: DatabaseConfigModel): TypeOrmModuleOptions => {
    let options: TypeOrmModuleOptions = <TypeOrmModuleOptions>{
        type: param.type,
        url: param.host,
        synchronize: true,
        useNewUrlParser: true,
    }
    
    if (env === 'DEV') {
        return {...options};
    } else if (env === 'ACCEPTANCE') {
        return {...options};
    } else if (env === 'PROD') {
        return {...options};
    }
    
}