import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/userprofile.entity';
import { FileService } from 'src/file/file.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserProfile])
  ],
  controllers: [UserController],
  providers: [UserService, FileService],
  exports : [UserService]
})
export class UserModule { }
