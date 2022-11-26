import { Optional } from "@nestjs/common"
import { ApiProperty, OmitType } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class ProductDto {

    @ApiProperty()
    @Optional()
    id: string

    @ApiProperty()
    @IsString()
    foto1: string

    @ApiProperty()
    @IsString()
    foto2: string

    @ApiProperty()
    @IsString()
    foto3: string

    @ApiProperty()
    @IsString()
    foto4: string

    @ApiProperty()
    @IsString()
    foto5: string

    @ApiProperty()
    @IsString()
    nama_product: string

    @ApiProperty()
    @IsString()
    harga: string

    @ApiProperty()
    @IsString()
    kategori: string

    @ApiProperty()
    @IsString()
    kondisi: string

    @ApiProperty()
    @IsString()
    minimal_pesanan: string

    @ApiProperty()
    @IsString()
    deskripsi: string

    @ApiProperty()
    @IsString()
    promo: string

    @ApiProperty()
    @IsString()
    toko_id: string
}

export class CreateProductDto extends OmitType(ProductDto, ['id']) { }