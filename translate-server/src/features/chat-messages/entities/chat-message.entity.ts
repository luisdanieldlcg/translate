import { Chat } from 'src/features/chats/entities/chat.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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
