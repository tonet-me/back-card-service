import {
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export enum SocialTitleEnum {
  INSTAGRAM = 'instagram',
  TWEETER = 'tweeter',
  YOUTUBE = 'youtube',
  WHATSAPP = 'whatsApp',
  TELEGRAM = 'telegram',
  LINKEDIN = 'linkedin',
}
export class AddSocialDto {
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  readonly userId: string;

  @IsDefined()
  @IsEnum(SocialTitleEnum)
  @IsNotEmpty()
  readonly title: SocialTitleEnum;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsDefined()
  @IsOptional()
  @IsNotEmpty()
  readonly icon: string;

  @IsDefined()
  @IsOptional()
  @IsNotEmpty()
  readonly isActive: boolean = true;
}
