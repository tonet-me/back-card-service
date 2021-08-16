import { Document } from 'mongoose';

export interface ISocialSchema extends Document {
  readonly title?: string;
  readonly content?: string;
  readonly icon?: string;
  readonly isActive?: boolean;
  readonly userId?: string;
}

export interface ISocial {
  readonly _id?: string;
  readonly title?: string;
  readonly content?: string;
  readonly icon?: string;
  readonly isActive?: boolean;
  readonly userId?: string;
}
