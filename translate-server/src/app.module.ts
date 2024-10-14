import { Module } from '@nestjs/common';
import ConfigModule from './config/config';
import { AuthModule } from './features/auth/auth.module';
import { DatabaseModule } from './config/db.config';

@Module({
  imports: [ConfigModule, DatabaseModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
