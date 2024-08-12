import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from "src/config/configuration";
import databaseConfig from "./config/config";

// Entities
import { User } from "../user/entities/user.entity";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [],
            useFactory: ()=> {
                const env = process.env.ENVIRONMENT || 'DEV';
                const dbConfig = databaseConfig(env, configuration().database);
                return {
                    ...dbConfig,
                    entities: [
                        User
                    ]
                };
            }
        })
    ]
})
export class DatabaseModule {}