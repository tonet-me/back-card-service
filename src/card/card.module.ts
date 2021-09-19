import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CardSchema } from './schema/card.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'Card',
        useFactory: () => {
          const schema = CardSchema;
          return schema;
        },
      },
    ]),
  ],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
