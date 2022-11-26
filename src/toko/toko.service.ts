import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTokoDto } from './dto/create-toko.dto';
import { UpdateTokoDto } from './dto/update-toko.dto';
import { Toko } from './entities/toko.entity';

@Injectable()
export class TokoService {
  constructor(
    @InjectRepository(Toko) private tokoRepo: Repository<Toko>
  ) {}

  create(dto: CreateTokoDto) {
    console.log(dto);
    return this.tokoRepo.save(dto);
  }

  findAll() {
    return this.tokoRepo.find();
  }

  findOne(id: string) {
    return this.tokoRepo.findOne(id);
  }

  update(id: string, dto: UpdateTokoDto) {
    id = dto.id
    return this.tokoRepo.save(dto);
  }

async  remove(id: string) {
  const data_toko = await this.tokoRepo.findOne(id);
    return this.tokoRepo.remove(data_toko);
  }
}
