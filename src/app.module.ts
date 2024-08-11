import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from './config/configuration';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

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

            console.log(client)
            console.log(chalk.green.bold("----> "),
                        chalk.green("The MongoDB connection established by "), 
                        chalk.bgGreen.bold.inverse(client.options.credentials.username),
                        chalk.green(" with project called "),
                        chalk.bgGreen.bold.inverse(client.options.appName)
                      )
          });
          connection.on('error', (err) => {
            // If there isn't throw, the useFactory is trying again and again.
            throw new Error(err.errorResponse.errmsg);
          });
        },
      }),
      inject: [ConfigService], 
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
