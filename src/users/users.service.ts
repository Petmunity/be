import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async postSignUp(email: string, password: string, nickname: string) {
    const user = await this.usersRepository.findOne({
      where: { username: email },
    });

    if (user) {
      throw new ForbiddenException('이미 존재하는 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const createUser = await this.usersRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
  }

  getUser() {
    console.log('get User');
  }
}
