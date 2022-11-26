import { Module } from '@nestjs/common';
import { TokoService } from './toko.service';
import { TokoController } from './toko.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Toko } from './entities/toko.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([Toko])
  ],
  controllers: [TokoController],
  providers: [TokoService]
})
export class TokoModule {}
