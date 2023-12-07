import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return false;
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      // 여기에서 필요한 추가 검증 로직을 수행할 수 있습니다.
      // 예를 들어, 토큰에서 얻은 사용자 ID를 기반으로 데이터베이스에서 사용자를 조회하고
      // 사용자가 존재하는지 등을 확인할 수 있습니다.

      // 검증이 성공하면 request 객체에 유용한 정보를 저장할 수 있습니다.
      request.user = payload;

      return true;
    } catch (error) {
      return false;
    }
  }
}
