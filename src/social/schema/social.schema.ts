import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { ISocialSchema } from '../interface/social.interface';

export const SocialSchema = new mongoose.Schema<ISocialSchema>(
  {
    userId: { type: mongoose.Types.ObjectId, required: true },
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    icon: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

SocialSchema.plugin(mongoosePaginate);
