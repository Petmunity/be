import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'Petmmuity', name: 'users' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id ' })
  id: number;

  @Column('varchar', { name: 'username', unique: false, length: 30 })
  username: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
