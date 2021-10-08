import { Document } from 'mongoose';

export interface ICountry extends Document {
  readonly name: string;
}
