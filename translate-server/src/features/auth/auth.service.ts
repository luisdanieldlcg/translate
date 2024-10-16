import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { UserService } from '../user/user.service';
import { User as User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async authenticate(dto: LoginDto) {
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

    if (dto.password !== dto.password_confirm) {
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userService.create(dto.email, dto.password);
    return this.logIn(user);
  }

  /**
   * Logs in the given user by emitting new access token.
   * @param user User
   */

  private async logIn(user: User) {
    // TODO: Implement JWT
    return user;
  }
}
