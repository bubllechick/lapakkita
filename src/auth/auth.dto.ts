import { ApiProperty, PickType } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class AuthDto {

    @ApiProperty()
    @IsString()
    no_hp: string

    @ApiProperty()
    @IsString()
    password: string

}

export class AuthNo extends PickType(AuthDto, ['no_hp']) { }
export class AuthCode extends PickType(AuthDto, ['password']) { }