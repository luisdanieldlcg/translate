import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  message_id: number;
  @Column()
  chat_id: number;
  @Column()
  content: string;
  @Column()
  sent_by_user: boolean;
  @Column()
  created_at: Date;
}
