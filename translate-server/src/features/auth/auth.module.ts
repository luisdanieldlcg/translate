import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from 'src/config/jwt.config';
import { AccessStrategy } from './auth.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigType<typeof jwtConfig>) => {
        return {
          privateKey: config.JWT_PRIVATE_KEY,
          signOptions: {
            expiresIn: 60 * config.JWT_LIFETIME,
          },
        };
      },
      inject: [jwtConfig.KEY],
    }),
  ],
  providers: [AuthService, AccessStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
