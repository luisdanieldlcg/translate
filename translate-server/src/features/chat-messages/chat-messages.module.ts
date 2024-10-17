import { Module } from '@nestjs/common';
import { ChatMessagesService } from './chat-messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/chat-message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [ChatMessagesService],
  exports: [ChatMessagesService],
})
export class ChatMessagesModule {}
