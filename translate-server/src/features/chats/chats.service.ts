import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
  
@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private userRepository: Repository<Chat>,
  ) {}

  async create(createChatDto: CreateChatDto) {
    const chat = this.userRepository.create({
      title: createChatDto.initialMessage.substring(0, 50),
    });
    return this.userRepository.save(chat);
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
