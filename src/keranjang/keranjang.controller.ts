import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KeranjangService } from './keranjang.service';
import { CreateKeranjangDto } from './dto/create-keranjang.dto';
import { UpdateKeranjangDto } from './dto/update-keranjang.dto';

@Controller('keranjang')
export class KeranjangController {
  constructor(private readonly keranjangService: KeranjangService) {}

  @Post()
  create(@Body() createKeranjangDto: CreateKeranjangDto) {
    return this.keranjangService.create(createKeranjangDto);
  }

  @Get()
  findAll() {
    return this.keranjangService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.keranjangService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKeranjangDto: UpdateKeranjangDto) {
    return this.keranjangService.update(+id, updateKeranjangDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.keranjangService.remove(+id);
  }
}
