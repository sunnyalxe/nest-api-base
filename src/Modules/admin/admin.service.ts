import { ConflictException, Injectable } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { generateHash } from 'src/Utilities/crypto.utility';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { listAdminDto } from './dto/list-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}
  async getAllAdmin(listAdminDto: listAdminDto) {
    const { name, email, role } = listAdminDto;
    const where = {};

    if (name) {
      where['name'] = name;
    }

    if (email) {
      where['email'] = email;
    }

    if (role) {
      where['role'] = { $in: role };
    }

    const result = await this.adminRepository.find({ where });

    return result.map((admin) => plainToClass(Admin, admin));
  }
  async createAdmin({ password, ...rest }: CreateAdminDto) {
    // find duplicate email
    const admin = await this.adminRepository.findOne({
      where: { email: rest.email },
    });
    if (admin) {
      throw new ConflictException('Email already exists');
    }

    // create admin
    return await this.adminRepository.save({
      ...rest,
      password: await generateHash(password),
    });
  }

  async updateAdmin(id: number, { password, ...rest }: UpdateAdminDto) {
    await this.adminRepository.update(id, {
      ...rest,
      password: await generateHash(password),
    });
    return await this.getAdminById(id);
  }

  async getAdminById(id: number) {
    const result = await this.adminRepository.findOne({ where: { id } });
    return plainToClass(Admin, result);
  }

  findOneByEmail(email: string): Promise<Admin | null> {
    return this.adminRepository.findOneBy({ email });
  }
  findOne(id: number, options?: FindOneOptions<Admin>): Promise<Admin | null> {
    return this.adminRepository.findOne({
      ...options,
      where: { ...options?.where, id },
    });
  }
}
