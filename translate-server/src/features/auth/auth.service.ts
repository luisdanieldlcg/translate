import { Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
  login(dto: LoginDto) {
    return 'Login';
  }

  signup(dto: RegisterDto) {
    return 'Signup';
  }
}
