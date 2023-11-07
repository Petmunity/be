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

@Entity({ schema: 'Petmmuity', name: 'customs' })
export class Customs {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id ' })
  id: number;

  @ManyToOne(() => Pets, (pet) => pet.Customs, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'pet_id', referencedColumnName: 'id' }])
  Pet: Pets;

  @Column('varchar', { name: 'username', unique: false, length: 30 })
  username: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
