import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddSocialDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

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
