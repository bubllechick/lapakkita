import { BadRequestException, Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { AuthDto, AuthNo } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService) { }

  @Post()
  async login(@Body() dto: AuthDto) {
    let user = await this.authService.cekUser(dto);
    if (user) {
      console.log(user.id);
      return this.authService.generateToken({ id: user.id })
    } else {
      throw new BadRequestException({ messages: 'gagal login' })
    }
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  cek(@Request() req) {
    console.log(req.user);
    return req.user
  }
}
