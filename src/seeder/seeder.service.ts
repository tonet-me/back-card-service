import { Injectable, Logger } from '@nestjs/common';
import { CountriesService } from 'src/countries/countries.service';
// import countryData from './countries.data.json';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ICountry } from 'src/countries/interface/country.interface';
@Injectable()
export class SeederService {
  constructor(private readonly countryService: CountriesService) {}
  public async seed() {
    this.countries();
  }

  async countries() {
    const countryFile = readFileSync(
      join(__dirname, 'data/countries.data.json'),
      'utf8',
    );
    const countries = JSON.parse(countryFile.toString());
    for (const country in countries) {
      const countryResult: ICountry = await this.countryService.insertCountry({
        name: country,
      });

      if (countryResult)
        for (const city of countries[country]) {
          this.countryService.insertCities({
            countryId: countryResult._id,
            name: city,
          });
        }
    }
  }
}
