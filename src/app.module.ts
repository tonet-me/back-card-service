import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import dbConf from 'config/db.conf';
import serverConf from 'config/server.conf';
import { CardModule } from './card/card.module';
import { StateModule } from './state/state.module';
import { SeederModule } from './seeder/seeder.module';
import { ViewCardModule } from './view-card/view-card.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.dev', '.env.prod'],
      load: [dbConf, serverConf],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        dbName: configService.get<string>('database.dbName'),
        authMechanism: configService.get<string>('database.authMechanism'),
        authSource: configService.get<string>('database.authSource'),
        auth: {
          user: configService.get<string>('database.dbUser'),
          password: configService.get<string>('database.dbPass'),
        },
        // auth:
        //   configService.get<string>('env') != 'production'
        //     ? undefined
        //     : {
        //         user: configService.get<string>('database.dbUser'),
        //         password: configService.get<string>('database.dbPass'),
        //       },
      }),
      inject: [ConfigService],
    }),
    CardModule,
    StateModule,
    SeederModule,
    ViewCardModule,
  ],
})
export class AppModule {}
