import { PartialType } from '@nestjs/mapped-types';
import { IsDefined, IsMongoId, IsNotEmpty } from 'class-validator';
import { AddSocialDto } from './addSocial.dto';

export class UpdateSocialDto extends PartialType(AddSocialDto) {
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  readonly _id: string;
}
