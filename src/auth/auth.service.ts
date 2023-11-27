import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import { KakaoProfile } from './auth.type';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private jwtService: JwtService,
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

    const createUser = await this.usersRepository.save({
      socialId: String(id),
      provider,
      nickname,
      username,
      displayName,
    });

    return createUser;
  }

  async generateAccessToken(userId: number) {
    const payload = { sub: userId };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async generateRefreshToken(userId: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const payload = { sub: userId };
    const refreshToken = await this.jwtService.signAsync(payload);
    user.refreshToken = refreshToken;

    await this.usersRepository.save(user);

    return {
      refreshToken,
    };
  }

  async signIn(userId: number) {
    const payload = { sub: userId };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
