import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap () {
  const app = await NestFactory.create(AppModule);

  // getting the config service
  const configService = app.get(ConfigService);

  const PORT = configService.get<number>('config.app.port');

  await app.listen(PORT);
}
bootstrap();
