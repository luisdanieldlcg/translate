import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { TranslateDto } from './dto/translate-dto';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatsService.create(createChatDto);
  }

  @Get()
  getAll() {
    return this.chatsService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatsService.findOne(+id);
  }

  @Post(':id/translate')
  translate(@Param('id') id: string, @Body() dto: TranslateDto) {
    return this.chatsService.translate(+id, dto);
  }

  @Delete()
  deleteAll() {
    return this.chatsService.deleteAll();
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.chatsService.deleteOne(+id);
  }
}
