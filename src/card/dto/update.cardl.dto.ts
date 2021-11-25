import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsDefined, IsMongoId } from 'class-validator';
import { AddCardDto } from './add.card.dto';

export class UpdateCardDto extends PartialType(AddCardDto) {
  @IsDefined()
  @IsMongoId()
  readonly _id: string;
}
