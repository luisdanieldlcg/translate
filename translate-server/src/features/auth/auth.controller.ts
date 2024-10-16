import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
import * as constants from '../../common/constants';
import jwtConfig from 'src/config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { Response } from 'express';

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
    res.cookie(constants.accessTokenName, {
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
    res.cookie(constants.accessTokenName, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * this.config.JWT_LIFETIME,
    });
    return credentials;
  }
}
