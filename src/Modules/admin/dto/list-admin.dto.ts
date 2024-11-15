import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from '../constants/role.enum';
import { Transform } from 'class-transformer';

export class listAdminDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsArray()
  @IsEnum(Role, { each: true })
  @Transform(({ value }) => (typeof value === 'string' ? value.split(',') : value))
  role: Role[];
}
