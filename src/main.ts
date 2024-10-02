import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    credentials: true
  });


  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

   // Configuração do Swagger
   const config = new DocumentBuilder()
   .setTitle('Agendify API')  // Título da API
   .setDescription('API completa do agendify')  // Descrição
   .setVersion('1.0')  // Versão da API
   .addTag('auth')
   .build();
 const document = SwaggerModule.createDocument(app, config);
 SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
}
bootstrap();
