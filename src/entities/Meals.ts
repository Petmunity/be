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

enum MealType {
  food,
  snack,
}

@Entity({ schema: 'Petmmunity', name: 'meals' })
export class Meals {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ManyToOne(() => Pets, (pet) => pet.Meals, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'pet_id', referencedColumnName: 'id' }])
  Pet: Pets;

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
