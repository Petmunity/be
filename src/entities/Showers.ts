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

enum ShowerType {
  brushing_teeth,
  shower,
}

@Entity({ schema: 'Petmmunity', name: 'showers' })
export class Showers {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ManyToOne(() => Users, (users) => users.showers)
  users: Users;

  @ManyToOne(() => Pets, (pets) => pets.showers)
  pets: Pets;

  @ManyToOne(() => Groups, (group) => group.showers)
  groups: Groups;

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
