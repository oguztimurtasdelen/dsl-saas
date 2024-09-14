import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe } from '@nestjs/common';
import configuration from './config/configuration';

const chalk = require('chalk');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Global Validation Pipe
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Ensures incoming request body is transformed to class instances
    whitelist: true, // Strips out properties that are not in the DTO
  }));

  // Swagger - API Doc - localhost:3000/api
  const swaggerEnvironments: Array<string> = ['DEVELOPMENT', 'ACCEPTANCE'];
  if (swaggerEnvironments.includes(configuration().system.environment)) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Dynamic Sports Lab - Swagger API Documentation')
      .setDescription('REST API documentation of Dynamic Sports Lab')
      .setVersion('1.0')
      .build();
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, swaggerDocument);
  }
  console.log(chalk.cyan("----> The application up on port:"),
              chalk.cyan.underline.bold(configuration().server.port || 3000));
  await app.listen(configuration().server.port || 3000);
}
bootstrap();
