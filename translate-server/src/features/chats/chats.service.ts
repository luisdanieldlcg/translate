import { HttpException, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../users/user.service';
import { ChatMessagesService } from '../chat-messages/chat-messages.service';
import { TranslateDto } from './dto/translate-dto';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    private userService: UserService,
    private messagesService: ChatMessagesService,
  ) {}

  async create(createChatDto: CreateChatDto) {
    const exists = await this.userService.existsById(createChatDto.owner_id);
    if (!exists) {
      throw new HttpException('The user of this chat does not exists', 404);
    }
    const chat = this.chatRepository.create({
      title: createChatDto.initialMessage.substring(0, 50),
      owner_id: createChatDto.owner_id,
    });

    const savedChat = await this.chatRepository.save(chat);
    return savedChat;
  }

  getAll() {
    return this.chatRepository.find();
  }

  async findOne(id: number) {
    const messages = await this.messagesService.findMessages(id);
    const chat = await this.chatRepository.findOne({
      where: { chat_id: id },
    });

    if (!chat) {
      return null;
    }

    return {
      ...chat,
      messages,
    };
  }

  translate(chat_id: number, dto: TranslateDto) {
    return this.messagesService.translate(
      chat_id,
      dto.from,
      dto.to,
      dto.message,
    );
  }

  async deleteAll() {
    await this.messagesService.deleteAllMessages();
    return this.chatRepository.delete({});
  }

  async deleteOne(id: number) {
    // first check if the chat exists
    const chat = await this.findOne(id);
    if (!chat) {
      throw new HttpException('Chat not found', 404);
    }
    //first delete the messages of this chat
    await this.messagesService.deleteMessagesByChat(id);
    return this.chatRepository.delete({ chat_id: id });
  }
}
