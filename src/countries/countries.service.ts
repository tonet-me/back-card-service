import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateResult } from 'mongoose';
import { IPaginateOption } from 'src/common/interface.ts/paginationOption.interface';
import { ICountry } from './interface/country.interface';

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel('Country')
    private countryModel: PaginateModel<ICountry>,
  ) {}

  public async findbyId(countryId: string): Promise<ICountry> {
    return this.countryModel.findById(countryId);
  }
  public async find(query: IPaginateOption): Promise<PaginateResult<ICountry>> {
    return this.countryModel.paginate(query.filters, query.paginationOptions);
  }

  public async findOne(query: any = {}): Promise<ICountry> {
    return this.countryModel.findOne(query);
  }
}
