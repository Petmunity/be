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

enum ShowerType {
  brushing_teeth,
  shower,
}

@Entity({ schema: 'Petmmunity', name: 'showers' })
export class Showers {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ManyToOne(() => Pets, (pet) => pet.Showers, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'pet_id', referencedColumnName: 'id' }])
  Pet: Pets;

  @Column('varchar', { name: 'username', unique: false, length: 30 })
  username: string;

  @Column({ type: 'enum', enum: ShowerType, name: 'type' })
  type: ShowerType;

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
