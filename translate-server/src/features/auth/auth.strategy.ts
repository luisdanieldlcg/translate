import { HttpException, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtConfig from 'src/config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { UserService } from '../users/user.service';
import { JwtPayload, UserPrincipal } from './auth.interfaces';
import { HttpStatusCode } from 'axios';
import * as constants from '../../common/constants';

const cookieExtractor = (req: Request) => {
  const cookies = req.cookies;
  if (!req || !cookies) {
    return undefined;
  }

  const accessToken = req.cookies[constants.accessTokenName];
  if (!accessToken) {
    return undefined;
  }

  return accessToken;
};
@Injectable()
export class AccessStrategy extends PassportStrategy(
  Strategy,
  constants.accessTokenName,
) {
  constructor(
    private readonly userService: UserService,
    @Inject(jwtConfig.KEY) config: ConfigType<typeof jwtConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      _ignoreExpiration: false,
      get ignoreExpiration() {
        return this._ignoreExpiration;
      },
      set ignoreExpiration(value) {
        this._ignoreExpiration = value;
      },
      secretOrKey: config.JWT_PRIVATE_KEY,
    });
  }

  public async validate(payload: JwtPayload): Promise<UserPrincipal> {
    // This will validate that the user still exists
    const user = await this.userService.findOne(payload.userId);
    if (!user) {
      throw new HttpException(
        'This user no longer exists',
        HttpStatusCode.Unauthorized,
      );
    }
    return {
      userId: user.user_id,
      email: user.email,
    };
  }
}
