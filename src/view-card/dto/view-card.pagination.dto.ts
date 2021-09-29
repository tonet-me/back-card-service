import { Type } from 'class-transformer';
import {
  IsDefined,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PaginateDTO } from 'src/common/dto/pagination.dto';

class OsDTO {
  @IsString()
  @IsOptional()
  readonly name: string;
}

class FilterDto {
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => OsDTO)
  readonly os: OsDTO;

  @IsOptional()
  @IsMongoId()
  readonly cardId: string;
}

export class ViewCardQueryResolversDTO {
  @ValidateNested({
    each: true,
  })
  @Type(() => FilterDto)
  @IsDefined()
  readonly filters: FilterDto | Object = {};

  @ValidateNested({
    each: true,
  })
  @Type(() => PaginateDTO)
  @IsDefined()
  readonly paginationOptions: PaginateDTO;
}
