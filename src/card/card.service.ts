import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
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
  public async find(query: any = {}): Promise<ICard[]> {
    return this.cardModel.find(query);
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
