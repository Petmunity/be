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

@Entity({ schema: 'Petmmuity', name: 'walks' })
export class Walks {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id ' })
  id: number;

  @ManyToOne(() => Pets, (pet) => pet.Walks, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'pet_id', referencedColumnName: 'id' }])
  Pet: Pets;

  @Column('int', { name: 'distance' })
  distance: number;

  @Column('int', { name: 'feces_count' })
  fecesCount: number;

  @Column('int', { name: 'urine_count' })
  urineCount: number;

  @Column('text', { name: 'memo' })
  memo: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
