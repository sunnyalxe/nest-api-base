import { IsEmail, IsEnum, IsString, Length, Matches } from 'class-validator';
import { Role } from '../constants/role.enum';

export class CreateAdminDto {
  @Length(3, 50)
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  @Length(8, 100)
  @IsString()
  password: string;

  @IsEnum(Role, {
    message: `Role must be one of ${Object.values(Role)}`,
  })
  role: Role;
}
