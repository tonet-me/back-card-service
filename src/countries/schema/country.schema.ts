import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { ICountry } from '../interface/country.interface';

export const CountrySchema = new mongoose.Schema<ICountry>(
  {
    userId: { type: mongoose.Types.ObjectId, required: true },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
CountrySchema.plugin(mongoosePaginate);
