import { AbstractEntity } from 'src/Database/abstract.entity';
import { Column, Entity } from 'typeorm';
import { Role } from '../constants/role.enum';
import { Exclude } from 'class-transformer';

@Entity()
export class Admin extends AbstractEntity<Admin> {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.Manager })
  role: Role;

  @Column({ nullable: true })
  lastLogin: Date;

  // default current timestamp
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // default null and current timestamp at update query
  @Column({
    type: 'timestamp',
    nullable: true,
    default: null,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
