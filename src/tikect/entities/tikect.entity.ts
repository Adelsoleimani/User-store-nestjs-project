import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tikects' })
export class Tikect {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  subject: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.tikets)
  user: User;

  @ManyToOne(() => Tikect, (tikect) => tikect.replies, { nullable: true })
  replyTo: Tikect;

  @OneToMany(() => Tikect, (tiket) => tiket.replyTo)
  replies: Tikect[];
}
