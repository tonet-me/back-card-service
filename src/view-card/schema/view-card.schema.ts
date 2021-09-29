import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

import { IViewCard } from '../interface/view-card.interface';

export const ViewCardSchema = new mongoose.Schema<IViewCard>(
  {
    cardId: {
      type: mongoose.Types.ObjectId,
      red: 'Card',
    },
    ua: String,
    browser: {
      name: String,
      version: String,
      major: String,
    },
    engine: {
      name: String,
      version: String,
    },
    os: {
      name: String,
      version: String,
    },
    device: {
      vendor: String,
      model: String,
      type: { type: String },
    },
    cpu: {
      architecture: String,
    },
  },
  { timestamps: true },
);
ViewCardSchema.plugin(mongoosePaginate);
