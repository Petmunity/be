import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Pets } from './Pets';

@Entity({ schema: 'Petmmuity', name: 'Groups' })
export class Groups {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id ' })
  id: number;

  @OneToMany(() => Pets, (pets) => pets.Group)
  Pets: Pets[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
