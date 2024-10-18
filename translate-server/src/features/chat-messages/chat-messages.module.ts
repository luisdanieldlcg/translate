import { Module } from '@nestjs/common';
import { ChatMessagesService } from './chat-messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/chat-message.entity';
import { TranslationModule } from '../translation/translation.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), TranslationModule],
  providers: [ChatMessagesService],
  exports: [ChatMessagesService],
})
export class ChatMessagesModule {}
