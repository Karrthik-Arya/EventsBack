import { Controller, Post, Body } from '@nestjs/common';
import { AuthTokensDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() { idToken }: { idToken: string },
  ): Promise<AuthTokensDto> {
    const authDetails = await this.authService.login(idToken);

    return authDetails;
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() { refreshToken }: { refreshToken: string },
  ): Promise<{ accessToken: string }> {
    console.log('got request');
    return await this.authService.refreshToken(refreshToken);
  }
}
