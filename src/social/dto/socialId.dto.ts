import { OmitType } from '@nestjs/mapped-types';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class SocialIdDTO {
  @IsMongoId()
  @IsNotEmpty()
  readonly socialId: string;
}

export class getOwnSocialDTO {
  @IsMongoId()
  @IsNotEmpty()
  readonly _id: string;

  @IsMongoId()
  @IsNotEmpty()
  readonly userId: string;
}

export class getOwnSocialsDTO extends OmitType(getOwnSocialDTO, [
  '_id',
] as const) {}
