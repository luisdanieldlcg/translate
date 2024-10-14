import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  signup(@Body() dto: RegisterDto) {
    return this.authService.signup(dto);
  }
}