import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, CreateUserProfileDto, UpdateUserProfileDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';
import { InjectUser } from 'src/etc/decorator/inject-user.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register-user')
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Post('profile-user')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiBody({ type: CreateUserProfileDto })
  createProfile(@InjectUser() dto: CreateUserProfileDto) {
    return this.userService.createProfile(dto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Patch('profile-user/:id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiBody({type: UpdateUserProfileDto})
  updateProfile(@Param('id') id: string, @InjectUser() dto: UpdateUserProfileDto) {
    return this.userService.updateProfile(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
