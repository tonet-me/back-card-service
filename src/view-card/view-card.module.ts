import { Module } from '@nestjs/common';
import { ViewCardService } from './view-card.service';
import { ViewCardController } from './view-card.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ViewCardSchema } from './schema/view-card.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'ViewCard',
        useFactory: () => {
          const schema = ViewCardSchema;
          return schema;
        },
      },
    ]),
  ],
  controllers: [ViewCardController],
  providers: [ViewCardService],
})
export class ViewCardModule {}
