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
import jwtConfig from 'src/config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { Response } from 'express';
import { AccessGuard, GetUserPrincipal } from './auth.decorators';
import { UserPrincipal } from './auth.interfaces';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(jwtConfig.KEY)
    private readonly config: ConfigType<typeof jwtConfig>,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const credentials = await this.authService.authenticate(dto);
    res.cookie(constants.accessTokenName, credentials.token, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * this.config.JWT_LIFETIME,
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
      secure: false,
      maxAge: 60 * this.config.JWT_LIFETIME,
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
