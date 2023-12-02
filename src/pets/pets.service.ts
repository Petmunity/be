import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pets } from 'src/entities/Pets';
import { Repository } from 'typeorm';
import { RegisterService } from './types';
import { Groups } from 'src/entities/Groups';
import { dayjs } from 'src/common/dayjs';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pets)
    private petsRepository: Repository<Pets>,
    @InjectRepository(Groups) // GroupsRepository의 경로에 따라 수정
    private groupsRepository: Repository<Groups>,
  ) {}

  async register({
    name,
    type,
    gender,
    kind,
    weight,
    age,
    isNeuteringSurgery,
    userId,
  }: RegisterService) {
    const dateAge = dayjs(age).toDate();
    const group = await this.groupsRepository.save({});
    const pet = await this.petsRepository.save({
      name,
      type,
      gender,
      kind,
      weight,
      age: dateAge,
      userId,
      groupId: group.id,
      isNeuteringSurgery,
    });

    await this.groupsRepository
      .createQueryBuilder()
      .update(Groups)
      .set({ pets: { id: pet.id } })
      .where('id = :groupId')
      .setParameter('groupId', group.id)
      .execute();
  }

  //   async postSignUp(email: string, password: string, nickname: string) {
  //     const user = await this.usersRepository.findOne({
  //       where: { username: email },
  //     });

  //     if (user) {
  //       throw new ForbiddenException('이미 존재하는 이메일입니다.');
  //     }

  //     const hashedPassword = await bcrypt.hash(password, 12);
  //     const createUser = await this.usersRepository.save({
  //       email,
  //       nickname,
  //       password: hashedPassword,
  //     });
  //   }

  getUser() {
    console.log('get User');
  }
}
