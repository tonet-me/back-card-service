import { Controller, HttpStatus, NotFoundException } from '@nestjs/common';
import { CardService } from './card.service';
import { GrpcMethod } from '@nestjs/microservices';
import { IResponse } from 'src/common/utils/transform.response';
import { ICard } from './interface/card.interface';
import { Responser } from 'src/common/utils/responser';
import { UpdateCardDto } from './dto/update.cardl.dto';
import { AddCardDto } from './dto/add.card.dto';
import { getOwnCardDTO } from './dto/card.Id.dto';
import { UpdateBasicInfoCardDto } from './dto/update.base.card.dto';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @GrpcMethod('CardService', 'AddCard')
  public async addCard(body: AddCardDto): Promise<IResponse<ICard>> {
    const newcard: ICard = await this.cardService.create(body);
    return new Responser(true, 'Done ', newcard);
  }

  @GrpcMethod('CardService', 'UpdateCard')
  public async updateCard(body: UpdateCardDto): Promise<IResponse<ICard>> {
    const { _id, userId, ...updateData } = body;
    const updateCard: ICard = await this.cardService.update(
      _id,
      userId,
      updateData,
    );
    return new Responser(true, 'Done ', updateCard);
  }

  @GrpcMethod('CardService', 'UpdateBasicInfoCard')
  public async updateBasicInfoCard(
    body: UpdateBasicInfoCardDto,
  ): Promise<IResponse<ICard>> {
    const { _id, userId, ...updateData } = body;
    const updateCard: ICard = await this.cardService.update(
      _id,
      userId,
      updateData,
    );
    return new Responser(true, 'Done ', updateCard);
  }

  @GrpcMethod('CardService', 'GetOwnCard')
  public async getCard(body: getOwnCardDTO): Promise<IResponse<ICard>> {
    const card: ICard = await this.cardService.findOne({
      userId: body.userId,
      _id: body._id,
    });
    if (!card) throw new NotFoundException('card not found');
    return new Responser(true, 'Done ', card);
  }

  @GrpcMethod('CardService', 'GetPublicCard')
  public async getPublicCard(
    body: Pick<AddCardDto, 'userName'>,
  ): Promise<IResponse<ICard>> {
    const card: ICard = await this.cardService.findOne({
      userName: body.userName,
    });
    if (!card) throw new NotFoundException('card not found');
    return new Responser(true, 'Done ', card);
  }

  // @GrpcMethod('CardService', 'GetCardPublic')
  // public async getCardPublic(
  //   body: getOwnCardsDTO,
  // ): Promise<IResponse<ICard[]>> {
  //   const social: ICard[] = await this.cardService.find({
  //     userId: body.userId,
  //   });
  //   if (!social || social.length <= 0) {
  //     return new Responser(true, 'no content', [], HttpStatus.NO_CONTENT);
  //   }
  //   return new Responser(true, 'Done ', social);
  // }
  @GrpcMethod('CardService', 'GetOwnCards')
  public async getCards(
    body: Pick<getOwnCardDTO, 'userId'>,
  ): Promise<IResponse<ICard[]>> {
    const cards: ICard[] = await this.cardService.find({
      userId: body.userId,
    });

    if (!cards || cards.length <= 0) {
      return new Responser(true, 'no card', [], HttpStatus.NO_CONTENT);
    }

    return new Responser(true, 'Done ', cards);
  }
  @GrpcMethod('CardService', 'DeleteOwnCard')
  public async removeOwnCard(body: getOwnCardDTO): Promise<IResponse<ICard>> {
    const removeCard: ICard = await this.cardService.removeOwn(
      body._id,
      body.userId,
    );
    if (!removeCard) throw new NotFoundException('not found this card item');
    return new Responser(true, 'Done ', removeCard);
  }
}
