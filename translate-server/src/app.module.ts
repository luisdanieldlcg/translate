import { Module } from '@nestjs/common';
import ConfigModule from './config/config';
import { AuthModule } from './features/auth/auth.module';
import { DatabaseModule } from './db.config';
import { UserModule } from './features/user/user.module';

@Module({
  imports: [ConfigModule, DatabaseModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
