import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/chat-message.entity';
import { TranslationService } from '../translation/translation.service';

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
    private translationService: TranslationService,
  ) {}

  create(data: IChatMessage) {
    const chat = this.messageRepository.create({
      chat_id: data.chat_id,
      content: data.content,
      sent_by_user: data.sent_by_user,
    });
    return this.messageRepository.save(chat);
  }

  async translate(chatId: number, from: string, to: string, message: string) {
    // 1) save the original message
    await this.create({
      chat_id: chatId,
      sent_by_user: true,
      content: message,
    });
    // 2) translate the message
    const translatedText = await this.translationService.translate({
      from,
      to,
      text: message,
    });
    // 3) save the translated message
    const translation = await this.create({
      chat_id: chatId,
      sent_by_user: false,
      content:
        translatedText == null
          ? 'Translation failed'
          : translatedText.translated,
    });
    // 4) return the translated message
    return {
      message_id: translation.message_id,
      translated_text: translation.content,
      original_text: message,
      sent_by_user: translation.sent_by_user,
      created_at: translation.created_at,
    };
  }

  findMessages(chatId: number) {
    // return all the messages belonging to a chat
    return this.messageRepository.find({
      where: { chat_id: chatId },
    });
  }

  deleteAllMessages() {
    // delete all the messages of all chats (clear history)
    return this.messageRepository.delete({});
  }

  deleteMessagesByChat(chatId: number) {
    // delete all the messages belonging to a chat
    return this.messageRepository.delete({ chat_id: chatId });
  }
}
