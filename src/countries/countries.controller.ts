import { Controller, HttpStatus, NotFoundException } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PaginateResult } from 'mongoose';
import { Responser } from 'src/common/utils/responser';
import { IResponse } from 'src/common/utils/transform.response';
import { CountriesService } from './countries.service';
import { CountryIdDTO } from './dto/country.Id.dto';
import { CountryQueryResolversDTO } from './dto/country.pagination.dto';
import { ICountry } from './interface/country.interface';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countryService: CountriesService) {}

  @GrpcMethod('CountryService', 'GetCountry')
  public async getCountry(body: CountryIdDTO): Promise<IResponse<ICountry>> {
    const country = await this.countryService.findbyId(body._id);
    if (!country) throw new NotFoundException('country not found');
    return new Responser(true, {}, country);
  }

  @GrpcMethod('CountryService', 'GetCountries')
  public async getCountries(
    body: CountryQueryResolversDTO,
  ): Promise<IResponse<PaginateResult<ICountry>>> {
    console.log('query');

    const countries = await this.countryService.find(body);
    const httpStatus = countries.docs.length
      ? HttpStatus.OK
      : HttpStatus.NO_CONTENT;
    return new Responser(true, '', countries, httpStatus);
  }
}
