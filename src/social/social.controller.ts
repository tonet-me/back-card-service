import { Controller, NotFoundException } from '@nestjs/common';
import { SocialService } from './social.service';
import { GrpcMethod } from '@nestjs/microservices';
import { IResponse } from 'src/common/utils/transform.response';
import { ISocial } from './interface/social.interface';
import { Responser } from 'src/common/utils/responser';
import { UpdateSocialDto } from './dto/updateSocial.dto';
import { AddSocialDto } from './dto/addSocial.dto';
import { getOwnSocialDTO, getOwnSocialsDTO } from './dto/socialId.dto';

@Controller('social')
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  @GrpcMethod('SocialService', 'addSocial')
  public async addSocial(body: AddSocialDto): Promise<IResponse<ISocial>> {
    const newSocial: ISocial = await this.socialService.create(body);
    return new Responser(true, 'Done ', newSocial);
  }

  @GrpcMethod('SocialService', 'updateSocial')
  public async updateSocial(
    body: UpdateSocialDto,
  ): Promise<IResponse<ISocial>> {
    const updateSocial: ISocial = await this.socialService.update(
      body._id,
      body,
    );
    return new Responser(true, 'Done ', updateSocial);
  }
  @GrpcMethod('SocialService', 'getOwnSocial')
  public async getSocial(body: getOwnSocialDTO): Promise<IResponse<ISocial>> {
    const social: ISocial = await this.socialService.findOne({
      userId: body.userId,
      _id: body._id,
    });
    return new Responser(true, 'Done ', social);
  }
  @GrpcMethod('SocialService', 'getOwnSocials')
  public async getSocials(
    body: getOwnSocialsDTO,
  ): Promise<IResponse<ISocial[]>> {
    const socials: ISocial[] = await this.socialService.find({
      userId: body.userId,
    });
    return new Responser(true, 'Done ', socials);
  }
  @GrpcMethod('SocialService', 'deleteOwnSocial')
  public async updateProfile(
    body: getOwnSocialDTO,
  ): Promise<IResponse<ISocial>> {
    const removeSocial: ISocial = await this.socialService.removeOwn(
      body._id,
      body.userId,
    );
    if (!removeSocial)
      throw new NotFoundException('not found this social item');
    return new Responser(true, 'Done ', removeSocial);
  }
}
