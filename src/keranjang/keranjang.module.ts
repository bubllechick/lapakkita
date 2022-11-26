import { Module } from '@nestjs/common';
import { KeranjangService } from './keranjang.service';
import { KeranjangController } from './keranjang.controller';

@Module({
  controllers: [KeranjangController],
  providers: [KeranjangService]
})
export class KeranjangModule {}
