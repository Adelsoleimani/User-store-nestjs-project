import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'addresses' })
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  province: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  postal_code: string;

  @Column({ length: 11 })
  reciver_mobile: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.addresses)
  user: User;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
