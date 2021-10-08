import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import dbConf from 'config/db.conf';
import serverConf from 'config/server.conf';
import { CardModule } from './card/card.module';
import { CountriesModule } from './countries/countries.module';
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
        replicaSet: false,
        useCreateIndex: true,
      }),
      inject: [ConfigService],
    }),
    CardModule,
    CountriesModule,
    SeederModule,
    ViewCardModule,
  ],
})
export class AppModule {}
