import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  information: string;

  @Column()
  type: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn({ onUpdate: 'CURRENT_TIMESTAMP(6)' })
  update_at: Date;

  @ManyToOne(() => User, (usr) => usr.id)
  user: User;
}
