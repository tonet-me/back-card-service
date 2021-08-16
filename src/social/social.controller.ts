import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { SocialService } from './social.service';
import { GrpcMethod } from '@nestjs/microservices';
import { IResponse } from 'src/common/utils/transform.response';
import { ISocial } from './interface/social.interface';
import { Responser } from 'src/common/utils/responser';

@Controller('social')
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  @GrpcMethod('SocialService', 'addSocial')
  public async addSocial(body: ISocial): Promise<IResponse<ISocial>> {
    const newSocial: ISocial = await this.socialService.create(body);
    return new Responser(true, 'Done ', newSocial);
  }

  @GrpcMethod('SocialService', 'updateSocial')
  public async updateSocial(body: ISocial): Promise<IResponse<ISocial>> {
    const updateSocial: ISocial = await this.socialService.update(
      body._id,
      body,
    );
    return new Responser(true, 'Done ', updateSocial);
  }
  @GrpcMethod('SocialService', 'getSocial')
  public async getSocial(body: ISocial): Promise<IResponse<ISocial>> {
    const social: ISocial = await this.socialService.findbyId(body._id);
    return new Responser(true, 'Done ', social);
  }
  @GrpcMethod('SocialService', 'getSocials')
  public async getSocials(body: ISocial): Promise<IResponse<ISocial[]>> {
    const socials: ISocial[] = await this.socialService.find({
      userId: body.userId,
    });
    return new Responser(true, 'Done ', socials);
  }
  // @GrpcMethod('SocialService', 'deleteSocial')
  // public async updateProfile(body: ISocial): Promise<IResponse<ISocial>> {
  //   const social: ISocial = await this.socialService.update(body._id, body);
  //   return new Responser(true, 'Done ', social);
  // }
}
