import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PaginateDTO } from 'src/common/dto/pagination.dto';

class FilterDto {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsBoolean()
  @IsOptional()
  readonly isActive: string;
}

export class CardQueryResolversDTO extends PaginateDTO {
  @ValidateNested({
    each: true,
  })
  @Type(() => FilterDto)
  @IsDefined({})
  readonly filters: FilterDto | Object = {};

  @ValidateNested({
    each: true,
  })
  @Type(() => PaginateDTO)
  @IsDefined({})
  readonly paginationOptions: PaginateDTO;
}
