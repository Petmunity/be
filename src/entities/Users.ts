import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Groups } from './Groups';
import { Provider } from 'src/common/types';

@Entity({ schema: 'Petmmunity', name: 'users' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ManyToOne(() => Groups, (group) => group.Users, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'group_id', referencedColumnName: 'id' }])
  Group: Groups;

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
    enum: Provider,
    default: 'kakao',
    name: 'provider',
  })
  provider: Provider;

  @IsString()
  @IsNotEmpty()
  @Column('varchar', { name: 'socialId' })
  socialId: string;

  @Column('boolean', { name: 'isOnboarding', default: false })
  isOnboarding: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
