import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { TranslationModule } from '../translation/translation.module';
import { UserModule } from '../users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Chat]), TranslationModule, UserModule],
  controllers: [ChatsController],
  providers: [ChatsService],
})
export class ChatsModule {}
