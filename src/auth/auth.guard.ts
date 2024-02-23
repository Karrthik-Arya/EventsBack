import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request): Promise<boolean> {
    console.log('request');
    const authorization = request.headers['authorization'];

    if (!authorization) {
      return false;
    }

    try {
      const authToken = authorization.replace(/bearer/gim, '').trim();
      console.log(authToken);
      // Validate the session token
      const isValid = await this.authService.validateSessionToken(authToken);

      if (isValid) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}
