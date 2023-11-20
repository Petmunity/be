import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { ConfigService } from '@nestjs/config';
import { KakaoProfile } from './auth.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import { Provider } from 'src/common/types';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {
    super({
      clientID: configService.get('KAKAO_CLIENT_ID'),
      callbackURL: configService.get('KAKAO_CALLBACK_URL'),
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: KakaoProfile,
    done: CallableFunction,
  ) {
    const {
      id,
      username,
      displayName,
      _json: {
        properties: { nickname },
      },
    } = profile;
    const user = await this.userRepository.findOne({
      where: { socialId: String(id) },
    });
    if (user) {
      throw new UnauthorizedException('이미 존재하는 사용자입니다');
    }

    await this.userRepository.save({
      socialId: String(id),
      provider: Provider.kakao,
      nickname,
      username,
      displayName,
    });

    done(null, { user, accessToken, refreshToken });
  }
}
