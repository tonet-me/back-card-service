// import { PickType } from '@nestjs/mapped-types';
// import { IsDefined, IsMongoId } from 'class-validator';
// import { AddCardDto } from './add.card.dto';

// export class UpdateBasicInfoCardDto extends PickType(AddCardDto, [
//   'name',
//   'userName',
//   'title',
//   'about',
//   'userId',
//   'photo',
// ] as const) {
//   @IsDefined()
//   @IsMongoId()
//   readonly _id: string;
// }
