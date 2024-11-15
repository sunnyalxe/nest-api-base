import { PrimaryGeneratedColumn } from 'typeorm';

export class AbstractEntity<T> {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
