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

enum ToiletType {
  feces = 'feces',
  urine = 'urine',
}

enum WeightClassification {
  low = 'log',
  medium = 'medium',
  high = 'high',
}

@Entity({ schema: 'Petmmunity', name: 'toilets' })
export class Toilets {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ManyToOne(() => Users, (users) => users.toilets)
  users: Users;

  @ManyToOne(() => Pets, (pets) => pets.toilets)
  pets: Pets;

  @ManyToOne(() => Groups, (group) => group.toilets)
  groups: Groups;

  @Column('varchar', { name: 'username', unique: false, length: 30 })
  username: string;

  @Column({ type: 'enum', enum: ToiletType, name: 'type' })
  type: ToiletType;

  @Column('varchar', { name: 'status' })
  status: string;

  @Column({ type: 'enum', enum: WeightClassification, name: 'amount' })
  amount: WeightClassification;

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
