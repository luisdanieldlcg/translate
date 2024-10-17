import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { TranslationModule } from '../translation/translation.module';
import { UserModule } from '../users/user.module';
import { ChatMessagesModule } from '../chat-messages/chat-messages.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat]),
    TranslationModule,
    UserModule,
    ChatMessagesModule,
  ],
  controllers: [ChatsController],
  providers: [ChatsService],
})
export class ChatsModule {}
