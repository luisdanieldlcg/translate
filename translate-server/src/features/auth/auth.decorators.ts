import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPrincipal } from './auth.interfaces';
import { AuthGuard } from '@nestjs/passport';
import * as constants from '../../common/constants';
export const GetUserPrincipal = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const user = ctx.switchToHttp().getRequest().user as UserPrincipal;
    return user;
  },
);

export class AccessGuard extends AuthGuard(constants.accessTokenName) {
  constructor() {
    super();
  }
}
