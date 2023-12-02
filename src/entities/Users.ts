import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty, IsString } from 'class-validator';
import { ProviderEnumType } from 'src/common/types';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Pets } from './Pets';
import { GroupMembers } from './GroupMembers';
import { Groups } from './Groups';
import { Showers } from './Showers';
import { Toilets } from './Toilets';
import { Walks } from './Walks';
import { Meals } from './Meals';
import { Customs } from './Customs';

@Entity({ schema: 'Petmmunity', name: 'users' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @OneToMany(() => Pets, (pets) => pets.users)
  pets: Pets[];

  @OneToMany(() => Groups, (groups) => groups.users)
  groups: Groups[];

  @OneToMany(() => Showers, (showers) => showers.users)
  showers: Showers[];

  @OneToMany(() => GroupMembers, (groupMembers) => groupMembers.users)
  groupMembers: GroupMembers[];

  @OneToMany(() => Toilets, (toilets) => toilets.users)
  toilets: Toilets[];

  @OneToMany(() => Walks, (walks) => walks.users)
  walks: Walks[];

  @OneToMany(() => Meals, (meals) => meals.users)
  meals: Meals[];

  @OneToMany(() => Customs, (customs) => customs.users)
  customs: Customs[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '홍길동',
    description: '사용자 이름',
    required: true,
  })
  @Column('varchar', { name: 'username' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '홍길동',
    description: '화면에 보이는 사용자 이름',
    required: true,
  })
  @Column('varchar', { name: 'displayName' })
  displayName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'test',
    description: '닉네임',
    required: true,
  })
  @Column('varchar', { name: 'nickname' })
  nickname: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'kakao',
    description: '소셜 로그인 종류',
    required: true,
  })
  @Column({
    type: 'enum',
    enum: ProviderEnumType,
    default: 'kakao',
    name: 'provider',
  })
  provider: ProviderEnumType;

  @IsString()
  @IsNotEmpty()
  @Column('varchar', { name: 'socialId', unique: true })
  socialId: string;

  @Column('boolean', { name: 'isOnboarding', default: false })
  isOnboarding: boolean;

  @IsString()
  @IsJWT()
  @Column('varchar', { name: 'refreshToken', unique: true, nullable: true })
  refreshToken?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
