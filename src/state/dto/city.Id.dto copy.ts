import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CityIdDTO {
  @IsMongoId()
  @IsNotEmpty()
  readonly _id: string;
}
