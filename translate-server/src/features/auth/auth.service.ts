import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { UserService } from '../users/user.service';
import { User as User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtPayload } from './auth.interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly config: ConfigType<typeof jwtConfig>,
  ) {}

  private readonly logger: Logger = new Logger(AuthService.name);

  async authenticate(dto: LoginDto) {
    this.logger.log(`Authenticating user ${dto.email}`);
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new HttpException(
        "User doesn't exist or password is incorrect",
        HttpStatus.NOT_FOUND,
      );
    }

    const valid = await bcrypt.compare(dto.password, user.password_hash);
    if (!valid) {
      throw new HttpException(
        "User doesn't exist or password is incorrect",
        HttpStatus.NOT_FOUND,
      );
    }
    return this.logIn(user);
  }

  async signup(dto: RegisterDto) {
    const exists = await this.userService.exists(dto.email);
    if (exists) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    const user = await this.userService.create(dto.email, dto.password);
    return this.logIn(user);
  }

  /**
   * Logs in the given user by emitting new access token.
   * @param user User
   */
  private async logIn(user: User) {
    const payload: JwtPayload = {
      userId: user.user_id,
    };
    // Sign token
    const token = await this.jwtService.signAsync(payload, {
      privateKey: this.config.JWT_PRIVATE_KEY,
    });
    return {
      ...user,
      token,
    };
  }
}
