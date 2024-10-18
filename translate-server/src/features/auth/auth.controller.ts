import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
import * as constants from '../../common/constants';
import { Response } from 'express';
import { AccessGuard, GetUserPrincipal } from './auth.decorators';
import { UserPrincipal } from './auth.interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const credentials = await this.authService.authenticate(dto);
    res.cookie(constants.accessTokenName, credentials.token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    });
    return credentials;
  }

  @Post('signup')
  async signup(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const credentials = await this.authService.signup(dto);
    res.cookie(constants.accessTokenName, credentials.token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    });
    return credentials;
  }

  @Post('verify-token')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessGuard)
  async verifyToken(@GetUserPrincipal() user: UserPrincipal) {
    // If we reach this point, the token is valid and the user exists
    // We can return the user data
    return user;
  }
}
