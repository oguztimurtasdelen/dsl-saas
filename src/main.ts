import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import configuration from './config/configuration';
import * as cookieParser from 'cookie-parser';
import { GlobalExceptionFilter } from './customs/filters/global-exception.filter';


const chalk = require('chalk');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Global Validation Pipe
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Ensures incoming request body is transformed to class instances
    whitelist: true, // Strips out properties that are not in the DTO

    exceptionFactory: (errors) => {
      const messages = errors.flatMap(error => Object.values(error.constraints ?? {}));

      return new BadRequestException({
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        errors: messages,
      });
    }
  }));

  app.useGlobalFilters(new GlobalExceptionFilter());

  app.use(cookieParser());
  
  // CORS Configuration: Only accept requests from the specified origin.
  if (configuration().server.allowed_origins) {
    app.enableCors({
      origin: configuration().server.allowed_origins,
      credentials: true, // Allow credentials (cookies, authorization headers)
      methods: 'GET,POST,PUT,DELETE', //Allowed HTTP Methods
      allowedHeaders: 'Content-Type, Authorization', // Allowed Headers
    }); 
  }

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

    console.log(chalk.green("----> Swagger API Documentation is available at:"),
                chalk.green.underline.bold(configuration().server.url + (configuration().server.port || 3000) + '/api'));
  }

  // Start the application
  console.log(chalk.cyan("----> Dynamic Sports Lab service application is up on port:"),
              chalk.cyan.underline.bold(configuration().server.port || 3000));
  await app.listen(configuration().server.port || 3000);

 
}
bootstrap();
