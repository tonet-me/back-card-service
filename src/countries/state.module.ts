import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CountrySchema } from './schema/country.schema';
import { CitySchema } from './schema/city.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'Country',
        useFactory: () => {
          const schema = CountrySchema;
          return schema;
        },
      },
      {
        name: 'City',
        useFactory: () => {
          const schema = CitySchema;
          return schema;
        },
      },
    ]),
  ],
  providers: [StateService],
  controllers: [StateController],
  exports: [StateService],
})
export class StateModule {}
