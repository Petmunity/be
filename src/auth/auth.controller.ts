import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLogin() {
    // 이 부분은 실행되지 않습니다.
    // 사용자는 Kakao 로그인 페이지로 리디렉션됩니다.
  }

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLoginCallback(@Req() req, @Res() res) {
    console.log('req', req);
    const accessToken = req.user.accessToken;
    // 이 부분은 Kakao 로그인 완료 후 호출됩니다.
    return 'Kakao login success';
  }
}
