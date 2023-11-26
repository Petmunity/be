import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import { KakaoProfile } from './auth.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async validateKakaoUser(profile: KakaoProfile): Promise<any> {
    const {
      provider,
      id,
      username,
      displayName,
      _json: {
        properties: { nickname },
      },
    } = profile;

    const user = await this.usersRepository.findOne({
      where: { socialId: String(id) },
    });

    if (user) {
      throw new UnauthorizedException('이미 존재하는 사용자입니다');
    }

    // await this.usersRepository.save({
    //   socialId: String(id),
    //   provider,
    //   nickname,
    //   username,
    //   displayName,
    // });

    return profile;
  }
}
