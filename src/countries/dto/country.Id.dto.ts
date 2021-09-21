import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CountryIdDTO {
  @IsMongoId()
  @IsNotEmpty()
  readonly _id: string;
}
