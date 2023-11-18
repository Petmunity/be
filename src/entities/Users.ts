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
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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

  @IsEmail()
  @ApiProperty({
    example: 'test@naver.com',
    description: '이메일',
    required: true,
  })
  @Column('varchar', { name: 'email', unique: true, length: 30 })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'password',
    description: '비밀번호',
    required: true,
  })
  @Column('varchar', { name: 'password' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'test',
    description: '닉네임',
    required: true,
  })
  @Column('varchar', { name: 'nickname', unique: true, length: 30 })
  nickname: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
