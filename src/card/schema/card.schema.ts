import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { SocialTitleEnum } from '../enum/socail.title.dto';
import { ICard } from '../interface/card.interface';

export const CardSchema = new mongoose.Schema<ICard>(
  {
    userId: { type: mongoose.Types.ObjectId, required: true },
    name: {
      type: String,
      required: true,
    },
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
        order: Number,
      },
    ],
    socials: [
      {
        title: { type: String, enum: SocialTitleEnum },
        content: { type: String },
        order: Number,
      },
    ],
    mails: [{ content: String, order: Number }],
    addresses: [
      {
        title: { type: String, required: true },
        country: String,
        city: String,
        address: String,
        location: {
          coordinates: [Number],
          type: { type: String },
        },
        order: Number,
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
