import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
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
  providers: [CountriesService],
  controllers: [CountriesController],
  exports: [CountriesService],
})
export class CountriesModule {}
