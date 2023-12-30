import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';
import { JwtGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { signUpDto } from './dtos/auth.dtos';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body: signUpDto) {
    return await this.authService.signUp(body);
  }

  @Post('getuser')
  async getUser(@Body() body) {
    return await this.authService.getCurrentUser(body);
  }

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return await this.authService.signIn(req.user);
  }

  @UseGuards(JwtGuard)
  @Post('logout')
  async logout() {
    return await this.authService.logout();
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshTokens(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}
