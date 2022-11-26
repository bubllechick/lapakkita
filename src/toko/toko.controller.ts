import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TokoService } from './toko.service';
import { CreateTokoDto } from './dto/create-toko.dto';
import { UpdateTokoDto } from './dto/update-toko.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';
import { InjectUser } from 'src/etc/decorator/inject-user.decorator';

@ApiTags('toko')
@Controller('toko')
export class TokoController {
  constructor(private readonly tokoService: TokoService) { }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiBody({ type: CreateTokoDto })
  create(@InjectUser() createTokoDto: CreateTokoDto) {
    return this.tokoService.create(createTokoDto);
  }

  @Get()
  findAll() {
    return this.tokoService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  findOne(@Param('id') id: string) {
    return this.tokoService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiBody({ type: CreateTokoDto })
  update(@Param('id') id: string, @InjectUser() updateTokoDto: UpdateTokoDto) {
    return this.tokoService.update(id, updateTokoDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  remove(@Param('id') id: string) {
    return this.tokoService.remove(id);
  }
}
