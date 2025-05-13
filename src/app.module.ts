import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GzipBodyMiddleware } from './gzip-body.middleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GzipBodyMiddleware)
      .forRoutes({ path: 'app/receber-gzip', method: RequestMethod.POST }); // ou a rota específica
  }
}
