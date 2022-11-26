import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      transform: true,
      validateCustomDecorators: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.use(json({ limit: '100mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  const configSwagger = new DocumentBuilder()
    .setTitle('Lapak-kita-api')
    .setDescription('Doc Api')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const configCustomSwagger: SwaggerCustomOptions = {
    swaggerOptions: { docExpansion: 'none' },
  };
  const doc = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('doc', app, doc, configCustomSwagger);

  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'pics'), {
    prefix: '/pics/',
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
