import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { AuthService } from './auth.service';
import { KakaoProfile } from './auth.type';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      callbackURL: process.env.KAKAO_CALLBACK_URL,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: KakaoProfile,
    done: CallableFunction,
  ) {
    console.log('profile', profile);
    console.log('accessToken', accessToken);
    console.log('refreshToekn', refreshToken);
    const user = await this.authService.validateKakaoUser(profile);
    done(null, user, accessToken, refreshToken);
  }
}
