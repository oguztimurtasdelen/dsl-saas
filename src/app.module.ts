import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from './config/configuration';

// Modules
import { UserModule } from './modules/user/user.module';
import { UserprofileModule } from './modules/userprofile/userprofile.module';
import { DeviceModule } from "./modules/device/device.module";
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { DatabaseModule } from './modules/database/database.module';


const chalk = require('chalk');

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),

    DatabaseModule,
    AuthenticationModule,
    UserModule,
    UserprofileModule,
    DeviceModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
