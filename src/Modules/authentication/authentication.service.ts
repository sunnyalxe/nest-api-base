import { Injectable } from '@nestjs/common';
import { Admin } from '../admin/entities/admin.entity';
import { AdminService } from '../admin/admin.service';
import { AuthRefreshTokenService } from './auth-refresh-token.service';
import { compareHash } from 'src/Utilities/crypto.utility';

@Injectable()
export class AuthenticationService {
  constructor(
    private adminService: AdminService,
    private readonly authRefreshTokenService: AuthRefreshTokenService,
  ) {}

  async validateUser(email: string, password: string): Promise<Admin | null> {
    const admin = await this.adminService.findOneByEmail(email);
    if (!admin) {
      return null;
    }

    const isMatch = await compareHash(password, admin.password);
    if (isMatch) {
      return admin;
    }
    return null;
  }

  login(admin: Admin) {
    return this.authRefreshTokenService.generateTokenPair(admin);
  }
}
