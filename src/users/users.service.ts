import { Injectable } from '@nestjs/common';
import { SignUpRequestDto } from './dto/signUp.request.dto';

@Injectable()
export class UsersService {
  postSignUp(data: SignUpRequestDto) {
    const { email, nickname, password } = data;
    console.log(email, nickname, password);
  }

  getUser() {
    console.log('get User');
  }
}
