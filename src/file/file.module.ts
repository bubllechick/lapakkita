import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { ConfigModule } from '@nestjs/config';
import { MinioModule} from '@svtslv/nestjs-minio';

@Module({
  imports : [
    ConfigModule,
    MinioModule.forRoot({
      config: {
        accessKey: process.env.ACCESS_KEY,
        endPoint: process.env.ENDPOINT_MINIO,
        secretKey: process.env.SECRET_KEY,
        useSSL: process.env.SSL_MINIO === 'true' ? true : false,
      }
    })
  ],
  controllers: [FileController],
  providers: [FileService],
  exports : [FileService]
})
export class FileModule {}
