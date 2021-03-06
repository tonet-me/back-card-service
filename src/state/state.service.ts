import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateResult } from 'mongoose';
import { IPaginateOption } from 'src/common/interface.ts/paginationOption.interface';
import { ICity } from './interface/city.interface.ts';
import { ICountry } from './interface/country.interface';

@Injectable()
export class StateService {
  constructor(
    @InjectModel('Country')
    private countryModel: PaginateModel<ICountry>,
    @InjectModel('City')
    private cityModel: PaginateModel<ICity>,
  ) {}

  public async findCountryById(countryId: string): Promise<ICountry> {
    return this.countryModel.findById(countryId);
  }
  public async findCountires(
    query: IPaginateOption,
  ): Promise<PaginateResult<ICountry>> {
    return this.countryModel.paginate(query.filters, query.paginationOptions);
  }

  public async findOneCountry(query: any = {}): Promise<ICountry> {
    return this.countryModel.findOne(query);
  }

  public async findCityById(cityId: string): Promise<ICity> {
    return this.cityModel.findById(cityId);
  }
  public async findCities(
    query: IPaginateOption,
  ): Promise<PaginateResult<ICity>> {
    return this.cityModel.paginate(query.filters, query.paginationOptions);
  }

  public async findOneCity(query: any = {}): Promise<ICity> {
    return this.cityModel.findOne(query);
  }

  public async insertCountry(data: Partial<ICountry>): Promise<ICountry> {
    return this.countryModel.findOneAndUpdate({ name: data.name }, data, {
      upsert: true,
      new: true,
    });
  }
  public async insertCities(data: Partial<ICity>): Promise<ICountry> {
    return this.cityModel.findOneAndUpdate(
      { countryId: data.countryId, name: data.name },
      data,
      {
        upsert: true,
      },
    );
  }
}
