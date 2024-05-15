import { NestFactory } from '@nestjs/core';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );
  const configService = app.get(ConfigService);
  const PORT = Number(configService.get('PORT'));
  app.useLogger(app.get(Logger));
  await app.listen(PORT, '0.0.0.0');
}
bootstrap();
