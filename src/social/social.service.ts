import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, Types } from 'mongoose';
import { ISocial, ISocialSchema } from './interface/social.interface';

@Injectable()
export class SocialService {
  constructor(
    @InjectModel('Social')
    private socialModel: PaginateModel<ISocialSchema>,
  ) {}

  public async findbyId(socialId: string): Promise<ISocial> {
    return this.socialModel.findById(socialId);
  }
  public async find(query: any = {}): Promise<ISocial[]> {
    console.log('data', query);

    return this.socialModel.find(query);
  }

  public async create(socialData: ISocial): Promise<ISocial> {
    const newSocial = new this.socialModel(socialData);
    return newSocial.save();
  }

  public async update(socialId: string, socialData: ISocial): Promise<ISocial> {
    return this.socialModel.findByIdAndUpdate(
      socialId,
      {
        $set: socialData,
      },
      {
        new: true,
      },
    );
  }

  public async remove(socialId: Types.ObjectId) {}
}
