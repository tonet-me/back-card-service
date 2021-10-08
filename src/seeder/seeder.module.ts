import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import dbConf from 'config/db.conf';
import serverConf from 'config/server.conf';
import { StateModule } from 'src/state/state.module';
import { SeederService } from './seeder.service';

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
      }),
      inject: [ConfigService],
    }),
    StateModule,
  ],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
