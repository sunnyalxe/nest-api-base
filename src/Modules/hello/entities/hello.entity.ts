import { AbstractEntity } from '../../../Database/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Hello extends AbstractEntity<Hello> {
  @Column()
  message: string;

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
