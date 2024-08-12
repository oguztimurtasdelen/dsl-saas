import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from './config/configuration';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './modules/user/user.service';
import { UserprofileModule } from './modules/userprofile/userprofile.module';

const chalk = require('chalk');

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        
        onConnectionCreate(connection) {
          connection.on('connected', () => {
            const client = connection.getClient();
            // Log db connection information.
            console.log(chalk.cyan.bold("----> "),
                        chalk.cyan("The MongoDB connection established by "), 
                        chalk.bgCyan.bold.inverse(client.options.credentials.username),
                        chalk.cyan("(dbUser) with project called "),
                        chalk.bgCyan.bold.inverse(client.options.appName),
                        chalk.cyan("(clusterName)")
                      );
          });
          connection.on('error', (err) => {
            // If there isn't throw, the useFactory is trying again and again.
            throw new Error(err.errorResponse.errmsg);
          });
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    UserprofileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
