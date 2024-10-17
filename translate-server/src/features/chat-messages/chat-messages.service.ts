import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/chat-message.entity';

interface IChatMessage {
  chat_id: number;
  content: string;
  sent_by_user: boolean;
}
@Injectable()
export class ChatMessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  create(data: IChatMessage) {
    const chat = this.messageRepository.create({
      chat_id: data.chat_id,
      content: data.content,
      sent_by_user: data.sent_by_user,
    });
    return this.messageRepository.save(chat);
  }
}
