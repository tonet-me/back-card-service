import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as path from 'path';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filter/allExceptions.filter';
import { TransformInterceptor } from './common/utils/transform.response';

async function bootstrap() {
  const HOST = process.env.BASE_URL;
  const PORT = process.env.PORT;
  const URL = `${HOST}:${PORT}`;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: URL,
        package: ['user.card', 'tonet.state', 'view.card'],
        // protoLoader
        protoPath: [
          path.join(__dirname, '../proto/card.proto'),
          path.join(__dirname, '../proto/state.proto'),
          path.join(__dirname, '../proto/view-card.proto'),
        ],
      },
    },
  );

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      // forbidNonWhitelisted: true,
    }),
  );
  await app
    .listen()
    .then(() => {
      Logger.log(
        `in 🚀 ${HOST}:${PORT} 🚀`,
        'RUN SOCIAL_SERVICE SERVER SUCCESSFUL',
      );
    })
    .catch((err) => {
      Logger.error(err, 'RUN SOCIAL_SERVICE SERVER FAILD');
    });
}
bootstrap();
