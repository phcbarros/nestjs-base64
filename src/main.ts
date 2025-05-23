import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    //bodyParser: false,
  });
  app.useBodyParser('json', { limit: '300kb' });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
