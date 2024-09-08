import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';

// Modules
import { UserModule } from './modules/user/user.module';
import { ProfileModule } from './modules/profile/profile.module';
import { DeviceModule } from "./modules/device/device.module";
import { AuthenticationModule } from './modules/authentication/authentication.module';




const chalk = require('chalk');

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
    MongooseModule.forRoot(configuration().database.uri, {
      dbName: configuration().database.name
  }),

    AuthenticationModule,
    UserModule,
    ProfileModule,
    DeviceModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
