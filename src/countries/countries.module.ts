import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CountrySchema } from './schema/country.schema';

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
    ]),
  ],
  providers: [CountriesService],
  controllers: [CountriesController],
})
export class CountriesModule {}
