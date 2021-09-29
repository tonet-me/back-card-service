import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateResult } from 'mongoose';
import { IPaginateOption } from 'src/common/interface.ts/paginationOption.interface';
import { IViewCard } from './interface/view-card.interface';

@Injectable()
export class ViewCardService {
  constructor(
    @InjectModel('ViewCard')
    private viewCardModel: PaginateModel<IViewCard>,
  ) {}
  create(viewCardData: Partial<IViewCard>): Promise<IViewCard> {
    const newViewCard = new this.viewCardModel(viewCardData);
    return newViewCard.save();
  }
  public async findbyId(viewCardId: string): Promise<IViewCard> {
    return this.viewCardModel.findById(viewCardId);
  }
  public async find(
    query: IPaginateOption,
  ): Promise<PaginateResult<IViewCard>> {
    return this.viewCardModel.paginate(query.filters, query.paginationOptions);
  }

  public async findOne(query: any = {}): Promise<IViewCard> {
    return this.viewCardModel.findOne(query);
  }
}
