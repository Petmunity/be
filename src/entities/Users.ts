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
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Groups } from './Groups';

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
