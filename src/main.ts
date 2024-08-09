import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe } from '@nestjs/common';
import configuration from './config/configuration';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global Validation Pipe
  app.useGlobalPipes(new ValidationPipe());

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
  
  await app.listen(configuration().server.port || 3000);
}
bootstrap();
