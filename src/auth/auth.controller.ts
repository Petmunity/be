import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Users } from 'src/entities/Users';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLogin() {
    // 이 부분은 실행되지 않습니다.
    // 사용자는 Kakao 로그인 페이지로 리디렉션됩니다.
  }

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLoginCallback(@Req() req, @Res() res) {
    const user = req.user as Users;
    const accessToken = await this.authService.generateAccessToken(user?.id);
    const refreshToken = await this.authService.generateRefreshToken(user?.id);

    res.json({ accessToken, refreshToken, message: 'success' });
    res.redirect('http://localhost:3000/');
  }
}
