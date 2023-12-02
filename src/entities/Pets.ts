import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsString,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Customs } from './Customs';
import { GroupMembers } from './GroupMembers';
import { Groups } from './Groups';
import { Meals } from './Meals';
import { Showers } from './Showers';
import { Toilets } from './Toilets';
import { Users } from './Users';
import { Walks } from './Walks';

enum PetType {
  dog = 'dog',
  cat = 'cat',
}

enum PetGender {
  male = 'male',
  female = 'female',
}

@Entity({ schema: 'Petmmunity', name: 'pets' })
export class Pets {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ManyToOne(() => Users, (users) => users.pets)
  users: Users;

  @OneToOne(() => Groups, (groups) => groups.pets)
  @JoinColumn()
  groups: Groups;

  @OneToMany(() => GroupMembers, (groupMembers) => groupMembers.pets)
  groupMembers: GroupMembers[];

  @OneToMany(() => Showers, (showers) => showers.pets)
  showers: Showers[];

  @OneToMany(() => Toilets, (toilets) => toilets.pets)
  toilets: Toilets[];

  @OneToMany(() => Walks, (walks) => walks.pets)
  walks: Walks[];

  @OneToMany(() => Meals, (meals) => meals.pets)
  meals: Meals[];

  @OneToMany(() => Customs, (customs) => customs.pets)
  customs: Customs[];

  @IsString()
  @ApiProperty({
    example: '연두',
    description: '강아지 이름',
    required: true,
  })
  @Column('varchar', { name: 'name', unique: false, length: 30 })
  name: string;

  @IsEnum(PetType)
  @ApiProperty({
    example: 'dog',
    description: '애완동물 유형(강아지 or 고양이)',
    required: true,
  })
  @Column({
    type: 'enum',
    enum: PetType,
    default: 'dog',
    name: 'type',
  })
  type: PetType;

  @IsString()
  @ApiProperty({
    example: '말티즈',
    description: '애완동물 종',
    required: true,
  })
  @Column('varchar', { name: 'kind' })
  kind: string;

  @IsDateString()
  @ApiProperty({
    example: '2023-01-01',
    description: '애완동물 생년월일',
    required: true,
  })
  @Column('date', { name: 'age' })
  age: Date;

  @IsBoolean()
  @ApiProperty({
    description: '애완동물 중성화 유무',
    required: true,
  })
  @Column('boolean', { name: 'is_neutering_surgery' })
  isNeuteringSurgery: boolean;

  @IsEnum(PetGender)
  @ApiProperty({
    example: 'male',
    description: '애완동물 성별',
    required: true,
  })
  @Column('enum', { enum: PetGender, name: 'gender' })
  gender: PetGender;

  @IsNumber()
  @ApiProperty({
    example: '2',
    description: '애완동물 무게(kg)',
    required: true,
  })
  @Column('int', { name: 'weight' })
  weight: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
