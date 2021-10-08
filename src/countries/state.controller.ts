import { Controller, HttpStatus, NotFoundException } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PaginateResult } from 'mongoose';
import { Responser } from 'src/common/utils/responser';
import { IResponse } from 'src/common/utils/transform.response';
import { StateService } from './state.service';
import { CountryIdDTO } from './dto/country.Id.dto';
import { CountryQueryResolversDTO } from './dto/country.pagination.dto';
import { ICountry } from './interface/country.interface';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @GrpcMethod('StateService', 'GetCountry')
  public async getCountry(body: CountryIdDTO): Promise<IResponse<ICountry>> {
    const country = await this.stateService.findbyId(body._id);
    if (!country) throw new NotFoundException('country not found');
    return new Responser(true, {}, country);
  }

  @GrpcMethod('StateService', 'GetCountries')
  public async getCountries(
    body: CountryQueryResolversDTO,
  ): Promise<IResponse<PaginateResult<ICountry>>> {
    const countries = await this.stateService.find(body);
    const httpStatus = countries.docs.length
      ? HttpStatus.OK
      : HttpStatus.NO_CONTENT;
    return new Responser(true, '', countries, httpStatus);
  }
}
