import { Module } from '@nestjs/common';
import { SocialService } from './social.service';
import { SocialController } from './social.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SocialSchema } from './schema/social.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'Social',
        useFactory: () => {
          const schema = SocialSchema;
          return schema;
        },
      },
    ]),
  ],
  controllers: [SocialController],
  providers: [SocialService],
})
export class SocialModule {}
