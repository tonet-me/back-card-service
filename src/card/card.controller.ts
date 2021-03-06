import { Controller, HttpStatus, NotFoundException } from '@nestjs/common';
import { CardService } from './card.service';
import { GrpcMethod } from '@nestjs/microservices';
import { IResponse } from 'src/common/utils/transform.response';
import { CardAvalable, ICard } from './interface/card.interface';
import { Responser } from 'src/common/utils/responser';
import { UpdateCardDto } from './dto/update.cardl.dto';
import { AddCardDto } from './dto/add.card.dto';
import { getOwnCardDTO } from './dto/card.Id.dto';
import { CardQueryResolversDTO } from './dto/card.pagination';
import { PaginateResult } from 'mongoose';
import { CardNameDTO } from './dto/cardName.dto';

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

  @GrpcMethod('CardService', 'GetOwnCard')
  public async getCard(body: getOwnCardDTO): Promise<IResponse<ICard>> {
    const card: ICard = await this.cardService.findOne({
      userId: body.userId,
      _id: body._id,
    });
    if (!card) throw new NotFoundException('card not found');
    return new Responser(true, 'Done ', card);
  }

  @GrpcMethod('CardService', 'GetPublicCardByUsername')
  public async getPublicCardByUsername(
    body: Pick<AddCardDto, 'userName'>,
  ): Promise<IResponse<ICard>> {
    const card: ICard = await this.cardService.findOne({
      userName: body.userName.toLowerCase(),
      isActive: true,
    });
    if (!card) throw new NotFoundException('card not found');
    return new Responser(true, 'Done ', card);
  }

  @GrpcMethod('CardService', 'GetPublicCardByQrcode')
  public async getPublicCardByQrcode(
    body: Pick<getOwnCardDTO, '_id'>,
  ): Promise<IResponse<ICard>> {
    const card: ICard = await this.cardService.findOne({
      _id: body._id,
      isActive: true,
    });
    if (!card) throw new NotFoundException('card not found');
    return new Responser(true, 'Done ', card);
  }

  @GrpcMethod('CardService', 'GetOwnCards')
  public async getCards(
    body: Pick<getOwnCardDTO, 'userId'> & CardQueryResolversDTO,
  ): Promise<IResponse<PaginateResult<ICard>>> {
    const { filters, userId, ...paginationOptions } = body;
    const cards = await this.cardService.findByPaginate({
      filters: { ...filters, userId },
      ...paginationOptions,
    });
    const httpStatus = cards.docs.length
      ? HttpStatus.OK
      : HttpStatus.NO_CONTENT;
    return new Responser(true, 'Done ', cards, httpStatus);
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

  @GrpcMethod('CardService', 'CheckCardnameAvailable')
  public async CheckCardnameAvailable(
    body: CardNameDTO,
  ): Promise<IResponse<CardAvalable>> {
    const findCard: ICard = await this.cardService.findOne({
      userName: body.userName,
    });
    if (!findCard)
      return new Responser(true, 'Available', { cardAvailable: true });
    return new Responser(true, 'Not available', { cardAvailable: false });
  }

  @GrpcMethod('CardService', 'DeleteCardPhoto')
  public async deleteCardPhoto(body: getOwnCardDTO): Promise<IResponse<ICard>> {
    const deletePhoto: ICard = await this.cardService.update(
      body._id,
      body.userId,
      {
        photo: '',
      },
    );
    if (!deletePhoto) throw new NotFoundException('card not found');
    return new Responser(true, '', deletePhoto);
  }
}
