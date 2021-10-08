import { Injectable, Logger } from '@nestjs/common';
import { StateService } from 'src/countries/state.service';
// import countryData from './countries.data.json';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ICountry } from 'src/countries/interface/country.interface';
@Injectable()
export class SeederService {
  constructor(private readonly stateService: StateService) {}
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
      const countryResult: ICountry = await this.stateService.insertCountry({
        name: country,
      });

      Logger.log(country, 'country');
      for (const city of countries[country]) {
        this.stateService.insertCities({
          countryId: countryResult._id,
          name: city,
        });
        Logger.log(city, 'city');
      }
    }
    Logger.log('Done');
  }
}
