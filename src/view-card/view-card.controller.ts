import { Controller, HttpStatus } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PaginateResult } from 'mongoose';
import { Responser } from 'src/common/utils/responser';
import { IResponse } from 'src/common/utils/transform.response';
import { AddViewCardDto } from './dto/add.view-card.dto';
import { ViewCardQueryResolversDTO } from './dto/view-card.pagination.dto';
import { IViewCard } from './interface/view-card.interface';
import { ViewCardService } from './view-card.service';

@Controller('view-card')
export class ViewCardController {
  constructor(private readonly viewCardService: ViewCardService) {}

  @GrpcMethod('ViewCardService', 'AddViewCard')
  public async addViewCard(
    body: AddViewCardDto,
  ): Promise<IResponse<IViewCard>> {
    const newViewCard: IViewCard = await this.viewCardService.create(body);
    return new Responser(true, 'Done ', newViewCard);
  }

  @GrpcMethod('ViewCardService', 'GetOwnViewsCard')
  public async getOwnViewsCard(
    body: ViewCardQueryResolversDTO,
  ): Promise<IResponse<PaginateResult<IViewCard>>> {
    const viewCards = await this.viewCardService.find(body);

    const httpStatus = viewCards.docs.length
      ? HttpStatus.OK
      : HttpStatus.NO_CONTENT;
    return new Responser(true, '', viewCards, httpStatus);
  }
}
