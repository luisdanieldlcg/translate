import { HttpException, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../users/user.service';
import { ChatMessagesService } from '../chat-messages/chat-messages.service';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private userRepository: Repository<Chat>,
    private userService: UserService,
    private messagesService: ChatMessagesService,
  ) {}

  async create(createChatDto: CreateChatDto) {
    const exists = await this.userService.existsById(createChatDto.owner_id);
    if (!exists) {
      throw new HttpException('The user of this chat does not exists', 404);
    }
    const chat = this.userRepository.create({
      title: createChatDto.initialMessage.substring(0, 50),
      owner_id: createChatDto.owner_id,
    });

    const savedChat = await this.userRepository.save(chat);
    // save first message
    await this.messagesService.create({
      chat_id: chat.chat_id,
      content: createChatDto.initialMessage,
      sent_by_user: true,
    });
    return savedChat;
  }

  findAll() {
    return `This action returns all chats`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
