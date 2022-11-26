import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { AuthDto } from 'src/auth/auth.dto';
import { FileService } from 'src/file/file.service';
import { Repository } from 'typeorm';
import { CreateUserDto, CreateUserProfileDto, UpdateUserProfileDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/userprofile.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(UserProfile) private userProfileRepo: Repository<UserProfile>,
    private fileService : FileService
  ) { }
  async create(dto: CreateUserDto) {
    console.log(dto.no_telp);
    const no_telp = await this.findNo(dto.no_telp);
    if (no_telp) {
      throw new BadRequestException({ message: 'no telpon sudah terdaftar' });
    } else {
      return this.userRepo.save(dto);
    }
  }

  async createProfile(dto: CreateUserProfileDto) {
    if (dto.foto)
    await this.fileService
      .uploadImage(dto.foto, 'user-profile')
      .then(({ hashedFileName: imageName }) => {
        dto.foto = imageName;
      })
      .catch((err) => {
        throw new BadRequestException('Error Upload Image');
      });
    const dataprofile = await this.userProfileRepo.save(dto);
    return dataprofile;
  }

  async updateProfile(id: string, dto: UpdateUserProfileDto) {
    id = dto.id
    const data_profile = await this.userProfileRepo.findOne(id);
    if(data_profile.foto === dto.foto){
      dto.foto = data_profile.foto;
      console.log('data tidak usah diubah');
    } else {
      this.fileService.delete(data_profile.foto, 'user-profile');
      if (dto.foto)
        await this.fileService
          .uploadImage(dto.foto, 'user-profile')
          .then(({ hashedFileName: imageName }) => {
            dto.foto = imageName;
          })
          .catch((err) => {
            throw new BadRequestException('Error Upload Image');
          });
          console.log('data harus diubah');
    }
    console.log(dto);
    const dataprofile = this.userProfileRepo.save(dto);
    return dataprofile;
  }

  async login(dto: AuthDto) {
    const no_telp = await this.loginCheck(dto)
    if (no_telp) {
      return no_telp;
    } else {
      throw new BadRequestException({ message: 'Login gagal' });
    }
  }

  async loginCheck(dto) {
    return await this.userRepo.findOne({ where: { no_telp: dto.no_hp, password: dto.password } })
  }

  findNo(no) {
    return this.userRepo.findOne({ where: { no_telp: no } });
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: string) {
    return this.userRepo.findOne(id, {relations : ['userprofile']});
  }

  update(id: string, dto: UpdateUserDto) {
    id = dto.id
    return this.userRepo.save(dto);
  }

  async remove(id: string) {
    const data = await this.findOne(id);
    const data_img = data.userprofile[0].foto
    console.log(data_img);
    if (data) {
      this.fileService.delete(data_img, 'user-profile');
      return this.userRepo.remove(data);
    } else {
      throw new BadRequestException({ message: 'data tidak ditemukan' })
    }
  }
}
