import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const swaggerDoc = new DocumentBuilder()
    .setTitle('Montevino Restaurante')
    .setDescription('Montevino restaurante gourmet')
    .addBearerAuth()
    .build();

  const swaggerModule = SwaggerModule.createDocument(app, swaggerDoc);

  SwaggerModule.setup('docs', app, swaggerModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors();

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();