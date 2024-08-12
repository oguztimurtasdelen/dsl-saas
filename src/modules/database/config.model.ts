import { TypeOrmModuleOptions } from "@nestjs/typeorm"

export interface DatabaseConfigModel {
    type: TypeOrmModuleOptions["type"],
    host: string,
    port: number,
    name: string,
    username: string,
    password: string
}