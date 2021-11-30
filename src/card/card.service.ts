import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateResult } from 'mongoose';
import { IPaginateOption } from 'src/common/interface.ts/paginationOption.interface';
import { ICard } from './interface/card.interface';

@Injectable()
export class CardService {
  constructor(
    @InjectModel('Card')
    private cardModel: PaginateModel<ICard>,
  ) {}

  public async findbyId(cardId: string): Promise<ICard> {
    return this.cardModel.findById(cardId);
  }

  public async findByPaginate(
    query: IPaginateOption,
  ): Promise<PaginateResult<ICard>> {
    return this.cardModel.paginate(query.filters, query.paginationOptions);
  }

  public async findOne(query: any = {}): Promise<ICard> {
    return this.cardModel.findOne(query);
  }

  public async create(cardData: Partial<ICard>): Promise<ICard> {
    const newCard = new this.cardModel(cardData);
    return newCard.save();
  }

  public async update(
    cardId: string,
    userId: string,
    cardData: Partial<ICard>,
  ): Promise<ICard> {
    return this.cardModel.findOneAndUpdate(
      { _id: cardId, userId },
      {
        $set: cardData,
      },
      {
        new: true,
      },
    );
  }

  public async removeOwn(cardId: string, userId: string) {
    return this.cardModel.findOneAndDelete({ _id: cardId, userId });
  }
}
