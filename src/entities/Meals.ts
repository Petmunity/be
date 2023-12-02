import { ImagesColumnJson } from 'src/common/types/entities';
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
import { Pets } from './Pets';
import { Users } from './Users';
import { Groups } from './Groups';

enum MealType {
  food,
  snack,
}

@Entity({ schema: 'Petmmunity', name: 'meals' })
export class Meals {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ManyToOne(() => Users, (users) => users.meals)
  users: Users;

  @ManyToOne(() => Pets, (pets) => pets.meals)
  pets: Pets;

  @ManyToOne(() => Groups, (group) => group.meals)
  groups: Groups;

  @Column('varchar', { name: 'amount' })
  amount: string;

  @Column({ type: 'enum', enum: MealType, name: 'type' })
  type: MealType;

  @Column('text', { name: 'memo' })
  memo: string;

  @Column('json', { name: 'images' })
  images: ImagesColumnJson;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
