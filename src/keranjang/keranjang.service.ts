import { Injectable } from '@nestjs/common';
import { CreateKeranjangDto } from './dto/create-keranjang.dto';
import { UpdateKeranjangDto } from './dto/update-keranjang.dto';

@Injectable()
export class KeranjangService {
  create(createKeranjangDto: CreateKeranjangDto) {
    return 'This action adds a new keranjang';
  }

  findAll() {
    return `This action returns all keranjang`;
  }

  findOne(id: number) {
    return `This action returns a #${id} keranjang`;
  }

  update(id: number, updateKeranjangDto: UpdateKeranjangDto) {
    return `This action updates a #${id} keranjang`;
  }

  remove(id: number) {
    return `This action removes a #${id} keranjang`;
  }
}
