import {
  Body,
  ConflictException,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  loginBodyDTO,
  LoginResDTO,
  RefreshTokenDTO,
  RefreshTokenResDTO,
  RegisterBodyDTO,
  RegisterResDTO,
} from 'src/routes/auth/auth.dto';
import { AuthService } from 'src/routes/auth/auth.service';
import { AccessTokenGuard } from 'src/shared/guards/access-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // @UseInterceptors(ClassSerializerInterceptor) // This interceptor will serialize the response // chuan hoa du lieu goi di
  // from start i use UseInterceptors and SerializeOptions but i can add UseIterceptors to main so that i dont need to add it to every controller
  // @SerializeOptions({ type: RegisterResponseDTO }) // This will serialize the response with the RegisterResponseDTO class
  @Post('register')
  async register(@Body() body: RegisterBodyDTO) {
    const user = await this.authService.register(body);
    if (!user) {
      throw new ConflictException('Registration failed');
    }
    return new RegisterResDTO(user);
  }
  @Post('login')
  async login(@Body() body: loginBodyDTO) {
    return new LoginResDTO(await this.authService.login(body));
  }
  @UseGuards(AccessTokenGuard)
  @Post('refresh-token')
  async refreshToken(@Body() body: RefreshTokenDTO) {
    return new RefreshTokenResDTO(
      await this.authService.refreshToken(body.refreshToken)
    );
  }
}
