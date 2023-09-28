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
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn({ onUpdate: 'CURRENT_TIMESTAMP(6)' })
  update_at: Date;

  @ManyToOne(() => User, (usr) => usr.id)
  user: User;
}
