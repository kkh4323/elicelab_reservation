import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  // api 접근할 때 /api/가 들어가야 함.
  app.setGlobalPrefix('api');
  app.use(cookieParser());

  // origin의 value값만 여기에 접근 가능
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({ skipMissingProperties: true, transform: true }),
  );

  // swagger 설정
  const config = new DocumentBuilder()
    .setTitle('elicelab_reservation api')
    .setDescription('elicelab reservation website api')
    .setVersion('1.0')
    .addTag('elicelab')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = configService.get('SERVER_PORT') || 9000;
  await app.listen(port);
}
bootstrap();
