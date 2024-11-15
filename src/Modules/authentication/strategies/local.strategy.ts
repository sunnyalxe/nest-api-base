import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationService } from '../authentication.service';
import { Admin } from 'src/Modules/admin/entities/admin.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({ usernameField: 'email' });
  }

  async validate(username: string, password: string): Promise<Admin> {
    const admin = await this.authenticationService.validateUser(username, password);
    if (!admin) {
      throw new UnauthorizedException();
    }
    return admin;
  }
}
