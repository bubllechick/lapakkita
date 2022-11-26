import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { FileService } from 'src/file/file.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private fileService: FileService
  ) { }

  async create(dto: CreateProductDto) {
    console.log(dto);
    if (dto.foto1)
      await this.fileService
        .uploadImage(dto.foto1, 'product')
        .then(({ hashedFileName: imageName }) => {
          dto.foto1 = imageName;
        })
        .catch((err) => {
          throw new BadRequestException('Error Upload Image');
        });
    if (dto.foto2)
      await this.fileService
        .uploadImage(dto.foto2, 'product')
        .then(({ hashedFileName: imageName }) => {
          dto.foto2 = imageName;
        })
        .catch((err) => {
          throw new BadRequestException('Error Upload Image');
        });
    if (dto.foto3)
      await this.fileService
        .uploadImage(dto.foto3, 'product')
        .then(({ hashedFileName: imageName }) => {
          dto.foto3 = imageName;
        })
        .catch((err) => {
          throw new BadRequestException('Error Upload Image');
        });
    if (dto.foto4)
      await this.fileService
        .uploadImage(dto.foto4, 'product')
        .then(({ hashedFileName: imageName }) => {
          dto.foto4 = imageName;
        })
        .catch((err) => {
          throw new BadRequestException('Error Upload Image');
        });
    if (dto.foto5)
      await this.fileService
        .uploadImage(dto.foto5, 'product')
        .then(({ hashedFileName: imageName }) => {
          dto.foto5 = imageName;
        })
        .catch((err) => {
          throw new BadRequestException('Error Upload Image');
        });
    return this.productRepo.save({
      nama_product: dto.nama_product,
      harga: dto.harga,
      deskripsi: dto.deskripsi,
      kategori: dto.kategori,
      kondisi: dto.kondisi,
      minimal_pesanan: dto.minimal_pesanan,
      promo: dto.promo,
      foto1: dto.foto1,
      foto2: dto.foto2,
      foto3: dto.foto3,
      foto4: dto.foto4,
      foto5: dto.foto5,
      toko: { id: dto.toko_id }
    });
  }

  findAll() {
    return this.productRepo.find();
  }

  findOne(id: string) {
    return this.productRepo.findOne(id);
  }

  async update(id: string, dto: UpdateProductDto) {
    id = dto.id
    const data_product = await this.productRepo.findOne(id);
    if (data_product.foto1 === dto.foto1) {
      dto.foto1 = data_product.foto1;
      console.log('data tidak usah diubah');
    } else {
      this.fileService.delete(data_product.foto1, 'product');
      if (dto.foto1)
        await this.fileService
          .uploadImage(dto.foto1, 'product')
          .then(({ hashedFileName: imageName }) => {
            dto.foto1 = imageName;
          })
          .catch((err) => {
            throw new BadRequestException('Error Upload Image');
          });
      console.log('data harus diubah');
    }
    if (data_product.foto2 === dto.foto2) {
      dto.foto2 = data_product.foto2;
      console.log('data tidak usah diubah');
    } else {
      this.fileService.delete(data_product.foto1, 'product');
      if (dto.foto2)
        await this.fileService
          .uploadImage(dto.foto2, 'product')
          .then(({ hashedFileName: imageName }) => {
            dto.foto2 = imageName;
          })
          .catch((err) => {
            throw new BadRequestException('Error Upload Image');
          });
      console.log('data harus diubah');
    }
    if (data_product.foto3 === dto.foto3) {
      dto.foto3 = data_product.foto3;
      console.log('data tidak usah diubah');
    } else {
      this.fileService.delete(data_product.foto3, 'product');
      if (dto.foto3)
        await this.fileService
          .uploadImage(dto.foto3, 'product')
          .then(({ hashedFileName: imageName }) => {
            dto.foto3 = imageName;
          })
          .catch((err) => {
            throw new BadRequestException('Error Upload Image');
          });
      console.log('data harus diubah');
    }
    if (data_product.foto4 === dto.foto4) {
      dto.foto4 = data_product.foto4;
      console.log('data tidak usah diubah');
    } else {
      this.fileService.delete(data_product.foto4, 'product');
      if (dto.foto4)
        await this.fileService
          .uploadImage(dto.foto4, 'product')
          .then(({ hashedFileName: imageName }) => {
            dto.foto4 = imageName;
          })
          .catch((err) => {
            throw new BadRequestException('Error Upload Image');
          });
      console.log('data harus diubah');
    }
    if (data_product.foto5 === dto.foto5) {
      dto.foto5 = data_product.foto5;
      console.log('data tidak usah diubah');
    } else {
      this.fileService.delete(data_product.foto5, 'product');
      if (dto.foto5)
        await this.fileService
          .uploadImage(dto.foto5, 'product')
          .then(({ hashedFileName: imageName }) => {
            dto.foto5 = imageName;
          })
          .catch((err) => {
            throw new BadRequestException('Error Upload Image');
          });
      console.log('data harus diubah');
    }

    return this.productRepo.save({
      id: dto.id,
      nama_product: dto.nama_product,
      harga: dto.harga,
      deskripsi: dto.deskripsi,
      kategori: dto.kategori,
      kondisi: dto.kondisi,
      minimal_pesanan: dto.minimal_pesanan,
      promo: dto.promo,
      foto1: dto.foto1,
      foto2: dto.foto2,
      foto3: dto.foto3,
      foto4: dto.foto4,
      foto5: dto.foto5,
      toko: { id: dto.toko_id }
    });
  }

  async remove(id: string) {
    const data_product = await this.findOne(id);
    if (data_product) {
      this.fileService.delete(data_product.foto1, 'product');
      this.fileService.delete(data_product.foto2, 'product');
      this.fileService.delete(data_product.foto3, 'product');
      this.fileService.delete(data_product.foto4, 'product');
      this.fileService.delete(data_product.foto5, 'product');
      return await this.productRepo.remove(data_product);
    } else {
      throw new BadRequestException({ message: 'data tidak ada' });
    }

  }
}
