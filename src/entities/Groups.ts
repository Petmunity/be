import {
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
import { GroupMembers } from './GroupMembers';
import { Pets } from './Pets';
import { Users } from './Users';
import { Showers } from './Showers';
import { Toilets } from './Toilets';
import { Walks } from './Walks';
import { Meals } from './Meals';
import { Customs } from './Customs';

@Entity({ schema: 'Petmmunity', name: 'Groups' })
export class Groups {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ManyToOne(() => Users, (users) => users.groups)
  users: Users;

  @OneToMany(() => GroupMembers, (groupMember) => groupMember.groups)
  groupMembers: GroupMembers[];

  @OneToOne(() => Pets, (pets) => pets.groups)
  @JoinColumn()
  pets: Pets;

  @OneToMany(() => Showers, (showers) => showers.groups)
  showers: Showers[];

  @OneToMany(() => Toilets, (toilets) => toilets.groups)
  toilets: Toilets[];

  @OneToMany(() => Walks, (walks) => walks.groups)
  walks: Walks[];

  @OneToMany(() => Meals, (meals) => meals.groups)
  meals: Meals[];

  @OneToMany(() => Customs, (customs) => customs.groups)
  customs: Customs[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
