import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn()
  chat_id: number;
  @Column()
  owner_id: number;
  @Column()
  title: string;
  @Column()
  created_at: Date;
}
