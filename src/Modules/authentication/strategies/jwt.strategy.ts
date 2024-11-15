import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from 'src/Modules/admin/admin.service';
import { ConfigService } from '@nestjs/config';
import { Admin } from 'src/Modules/admin/entities/admin.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly adminService: AdminService;

  constructor(adminService: AdminService, configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('JWT_SECRETE'),
    });
    this.adminService = adminService;
  }

  async validate(payload: any): Promise<Admin | null> {
    const authUser = await this.adminService.findOne(payload.sub);
    if (!authUser) {
      throw new UnauthorizedException();
    }

    return authUser;
  }
}
