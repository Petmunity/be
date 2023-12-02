import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Groups } from './Groups';
import { Users } from './Users';
import { Pets } from './Pets';

@Entity({ schema: 'Petmmunity', name: 'GroupMembers' })
export class GroupMembers {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ManyToOne(() => Users, (users) => users.groupMembers)
  users: Users;

  @ManyToOne(() => Pets, (pets) => pets.groupMembers)
  pets: Pets;

  @ManyToOne(() => Groups, (group) => group.groupMembers)
  groups: Groups;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
