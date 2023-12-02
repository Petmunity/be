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

@Entity({ schema: 'Petmmunity', name: 'walks' })
export class Walks {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ManyToOne(() => Users, (users) => users.walks)
  users: Users;

  @ManyToOne(() => Pets, (pets) => pets.walks)
  pets: Pets;

  @ManyToOne(() => Groups, (group) => group.walks)
  groups: Groups;

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
