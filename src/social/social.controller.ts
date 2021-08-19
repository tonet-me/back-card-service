import { Controller, HttpStatus, NotFoundException } from '@nestjs/common';
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

  @GrpcMethod('SocialService', 'AddSocial')
  public async addSocial(body: AddSocialDto): Promise<IResponse<ISocial>> {
    const newSocial: ISocial = await this.socialService.create(body);
    return new Responser(true, 'Done ', newSocial);
  }

  @GrpcMethod('SocialService', 'UpdateSocial')
  public async updateSocial(
    body: UpdateSocialDto,
  ): Promise<IResponse<ISocial>> {
    const { _id, ...updateData } = body;
    const updateSocial: ISocial = await this.socialService.update(
      _id,
      updateData,
    );
    return new Responser(true, 'Done ', updateSocial);
  }
  @GrpcMethod('SocialService', 'GetOwnSocial')
  public async getSocial(body: getOwnSocialDTO): Promise<IResponse<ISocial>> {
    const social: ISocial = await this.socialService.findOne({
      userId: body.userId,
      _id: body._id,
    });
    if (!social) throw new NotFoundException('social not found');
    return new Responser(true, 'Done ', social);
  }
  @GrpcMethod('SocialService', 'GetSocialPublic')
  public async getSocialPublic(
    body: getOwnSocialsDTO,
  ): Promise<IResponse<ISocial[]>> {
    const social: ISocial[] = await this.socialService.find({
      userId: body.userId,
    });
    if (!social || social.length <= 0) {
      return new Responser(true, 'no content', [], HttpStatus.NO_CONTENT);
    }
    return new Responser(true, 'Done ', social);
  }
  @GrpcMethod('SocialService', 'GetOwnSocials')
  public async getSocials(
    body: getOwnSocialsDTO,
  ): Promise<IResponse<ISocial[]>> {
    const socials: ISocial[] = await this.socialService.find({
      userId: body.userId,
    });
    if (!socials || socials.length <= 0) {
      return new Responser(true, 'no content', [], HttpStatus.NO_CONTENT);
    }
    return new Responser(true, 'Done ', socials);
  }
  @GrpcMethod('SocialService', 'DeleteOwnSocial')
  public async removeOwnSocial(
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
