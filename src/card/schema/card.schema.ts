import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { SocialTitleEnum } from '../dto/addSocial.dto';
import { ISocialSchema } from '../interface/card.interface';

export const CardSchema = new mongoose.Schema<ISocialSchema>(
  {
    userId: { type: mongoose.Types.ObjectId, required: true },
    name: String,
    title: String,
    about: String,
    photo: String,
    website: String,
    qrcode: String,
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    phones: [
      {
        title: {
          type: String,
        },
        content: {
          type: String,
        },
      },
    ],
    socials: [
      {
        title: { type: String, enum: SocialTitleEnum },
        content: { type: String },
      },
    ],
    mails: [
      {
        type: String,
      },
    ],
    addresses: [
      {
        country: String,
        province: String,
        city: String,
        address: String,
        location: {
          coordinates: [Number],
          type: { type: String },
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
CardSchema.index({ location: '2dsphere' });
CardSchema.plugin(mongoosePaginate);
