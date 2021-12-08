import { Injectable, Logger } from '@nestjs/common';
import { StateService } from 'src/state/state.service';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ICountry } from 'src/state/interface/country.interface';
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
    const AllCountries = JSON.parse(countryFile.toString());
    for (const cityAndCountry of AllCountries.countries) {
      const countryResult: ICountry = await this.stateService.insertCountry({
        name: cityAndCountry['country'],
      });

      for (const city of cityAndCountry['states']) {
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
