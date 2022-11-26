import { Optional } from "@nestjs/common";
import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { IsObject, IsString } from 'class-validator';

export class UserDto {

    @ApiProperty()
    @Optional()
    id: string;

    @ApiProperty()
    @IsString()
    nama: string;

    @ApiProperty()
    @IsString()
    no_telp: string;

    @ApiProperty()
    @IsString()
    password: string;
}

export class CreateUserDto extends OmitType(UserDto, ['id']) { }

export class UserProfileDto {
    @ApiProperty()
    @Optional()
    id?: string;


    @ApiProperty()
    @IsString()
    foto: string;

    @ApiProperty()
    @IsString()
    no_telp: string;

    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsString()
    province: string;

    @ApiProperty()
    @IsString()
    kabupaten: string;

    @ApiProperty()
    @IsString()
    nama_lengkap: string;

    @ApiProperty()
    @IsString()
    alamat: string;
    
    @IsObject()
    user: UserDto
}

export class CreateUserProfileDto extends OmitType(UserProfileDto, ['id']) { }
export class UpdateUserProfileDto extends PartialType(UserProfileDto) { }

