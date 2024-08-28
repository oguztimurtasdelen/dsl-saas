import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from "src/config/configuration";
import databaseConfig from "./config/config";

// Entities
import { User } from "../user/entities/user.entity";
import { Userprofile } from "../userprofile/entities/userprofile.entity";
import { Device } from "../device/entities/device.entity";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [],
            useFactory: ()=> {
                const env = process.env.ENVIRONMENT || 'DEVELOPMENT';
                const dbConfig = databaseConfig(env, configuration().database);
                return {
                    ...dbConfig,
                    entities: [
                        User,
                        Userprofile,
                        Device
                    ]
                };
            }
        })
    ]
})
export class DatabaseModule {}