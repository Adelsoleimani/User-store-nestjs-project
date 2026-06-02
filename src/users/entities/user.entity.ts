import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EnumRole } from '../enums/EnumRole';
import { Address } from 'src/address/entities/address.entity';
import { Tikect } from 'src/tikect/entities/tikect.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  mobile: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: EnumRole, default: EnumRole.NormalUser })
  role: EnumRole;

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @OneToMany(() => Tikect, (tiket) => tiket.user)
  tikets: Tikect[];

  @ManyToMany(() => Product, (product) => product.users)
  products_mark: Product[];

  @ManyToMany(() => Product, (product) => product.basket_product)
  @JoinTable({
    name: 'basket_item',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
  })
  basket_item: Product[];

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
