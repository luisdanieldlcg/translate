import { Module } from '@nestjs/common';
import ConfigModule from './config/config';
import { AuthModule } from './features/auth/auth.module';
import { DatabaseModule } from './db.config';
import { UserModule } from './features/users/user.module';
import { ChatsModule } from './features/chats/chats.module';
import { TranslationModule } from './features/translation/translation.module';

@Module({
  imports: [ConfigModule, DatabaseModule, AuthModule, UserModule, ChatsModule, TranslationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
