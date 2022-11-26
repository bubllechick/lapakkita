import { Optional } from "@nestjs/common"
import { ApiProperty, OmitType } from "@nestjs/swagger"
import { IsObject, IsString } from "class-validator"
import { UserDto } from "src/user/dto/create-user.dto"

export class TokoDto {
    @ApiProperty()
    @Optional()
    id: string

    @ApiProperty()
    @IsString()
    alamat: string

    @IsObject()
    user: UserDto
}
export class CreateTokoDto extends OmitType(TokoDto, ['id']) {}