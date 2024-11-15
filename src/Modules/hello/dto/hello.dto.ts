import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateHelloDto {
  @IsString()
  @IsNotEmpty()
  message: string;
}

export class UpdateHelloDto extends PartialType(CreateHelloDto) {}
