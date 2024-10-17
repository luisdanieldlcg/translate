import { HttpException, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../users/user.service';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private userRepository: Repository<Chat>,
    private userService: UserService,
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
