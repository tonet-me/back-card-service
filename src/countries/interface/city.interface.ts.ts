import { Document } from 'mongoose';

export interface ICity extends Document {
  readonly countryId: string;
  readonly name: string;
}
