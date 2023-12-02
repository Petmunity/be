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
import { Groups } from './Groups';
import { Users } from './Users';
import { GroupMembers } from './GroupMembers';
import { Showers } from './Showers';
import { Toilets } from './Toilets';
import { Walks } from './Walks';
import { Meals } from './Meals';
import { Customs } from './Customs';

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

  // @OneToMany(() => Walks, (walks) => walks.Pet)
  // Walks: Walks[];

  // @OneToMany(() => Meals, (meals) => meals.Pet)
  // Meals: Meals[];

  // @OneToMany(() => Toilets, (toilets) => toilets.Pet)
  // Toilets: Toilets[];

  // @OneToMany(() => Showers, (showers) => showers.Pet)
  // Showers: Showers[];

  // @OneToMany(() => Customs, (customs) => customs.Pet)
  // Customs: Customs[];

  @Column('varchar', { name: 'name', unique: false, length: 30 })
  name: string;

  @Column({
    type: 'enum',
    enum: PetType,
    default: 'dog',
    name: 'type',
  })
  type: PetType;

  @Column('varchar', { name: 'kind' })
  kind: string;

  @Column('date', { name: 'age' })
  age: Date;

  @Column('boolean', { name: 'is_neutering_surgery' })
  isNeuteringSurgery: boolean;

  @Column('enum', { enum: PetGender, name: 'gender' })
  gender: PetGender;

  @Column('int', { name: 'weight' })
  weight: number;

  @Column('varchar', { name: 'image' })
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
