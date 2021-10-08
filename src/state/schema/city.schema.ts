import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { ICountry } from '../interface/country.interface';

export const CitySchema = new mongoose.Schema<ICountry>(
  {
    countryId: { type: mongoose.Types.ObjectId, required: true },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
CitySchema.plugin(mongoosePaginate);
