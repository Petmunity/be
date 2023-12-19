import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Users } from 'src/entities/Users';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLogin() {
    // 이 부분은 실행되지 않습니다.
    // 사용자는 Kakao 로그인 페이지로 리디렉션됩니다.
  }

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLoginCallback(@Req() req, @Res() res: Response) {
    const user = req.user as Users;
    const { accessToken } = await this.authService.generateAccessToken(
      user?.id,
    );
    const { refreshToken } = await this.authService.generateRefreshToken(
      user?.id,
    );

    res.cookie('accessToken', accessToken);
    res.cookie('refreshToken', refreshToken);

    if (user?.isOnboarding) {
      res.redirect('https://petmunity.duck-blog.info/');
    } else {
      res.redirect('https://petmunity.duck-blog.info/onboarding');
    }
  }
}
