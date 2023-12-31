import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Pets } from './Pets';
import { Users } from './Users';
import { Groups } from './Groups';

@Entity({ schema: 'Petmmunity', name: 'customs' })
export class Customs {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ManyToOne(() => Users, (users) => users.customs)
  users: Users;

  @ManyToOne(() => Pets, (pets) => pets.customs)
  pets: Pets;

  @ManyToOne(() => Groups, (group) => group.customs)
  groups: Groups;

  @Column('varchar', { name: 'username', unique: false, length: 30 })
  username: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
