import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe()); // Dto validation

  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3000',
  }); // Enable CORS
  app.use(cookieParser());
  const config = app.get(ConfigService);
  const port = config.get('API_SERVER_PORT');
  const logger = new Logger('bootstrap');
  logger.log(`Server running on http://localhost:${port}`);
  await app.listen(port);
}
bootstrap();
