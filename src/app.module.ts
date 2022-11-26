import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {TwilioModule} from 'nestjs-twilio';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { KeranjangModule } from './keranjang/keranjang.module';
import { ProfileModule } from './profile/profile.module';
import { FavoriteModule } from './favorite/favorite.module';
import { TokoModule } from './toko/toko.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { User } from './user/entities/user.entity';
import { UserProfile } from './user/entities/userprofile.entity';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { Toko } from './toko/entities/toko.entity';
import { Product } from './product/entities/product.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TwilioModule.forRoot({
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DB,
      wait_timeout: 60000,
      entities: [
        User,
        UserProfile,
        Toko,
        Product
      ],
      synchronize: true
    }),
    UserModule, ChatModule, KeranjangModule, ProfileModule, FavoriteModule, OrderModule, ProductModule, TokoModule, AuthModule, FileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
