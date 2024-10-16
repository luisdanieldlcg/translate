import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;
  @Column({ unique: true })
  email: string;
  @Column()
  password_hash: string;
  @Column()
  preferred_language: number;
  @Column()
  created_at: Date;
}
