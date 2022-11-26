import { PartialType } from '@nestjs/swagger';
import {  TokoDto } from './create-toko.dto';

export class UpdateTokoDto extends PartialType(TokoDto) {}
