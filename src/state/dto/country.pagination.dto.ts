import { Transform, Type } from 'class-transformer';
import {
  IsDefined,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ConverToRegex } from 'src/common/decorator/regex.convert.decorator';
import { PaginateDTO } from 'src/common/dto/pagination.dto';

class FilterDto {
  @ConverToRegex('name')
  @IsString()
  @IsOptional()
  readonly name: string;
}

export class CountryQueryResolversDTO {
  @ValidateNested({
    each: true,
  })
  @Type(() => FilterDto)
  @IsDefined({})
  readonly filters: FilterDto;

  @ValidateNested({
    each: true,
  })
  @Type(() => PaginateDTO)
  @IsDefined({})
  readonly paginationOptions: PaginateDTO;
}
