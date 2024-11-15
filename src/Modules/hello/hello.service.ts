import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHelloDto, UpdateHelloDto } from './dto/hello.dto';
import { Repository } from 'typeorm';
import { Hello } from './entities/hello.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HelloService {
  constructor(
    @InjectRepository(Hello)
    private readonly helloRepository: Repository<Hello>,
  ) {}
  getHello(): string {
    return '||Jai Shree Ram||';
  }
  async createHello(createHelloDto: CreateHelloDto) {
    return await this.helloRepository.save(createHelloDto);
  }

  async updateHello(id: number, updateHelloDto: UpdateHelloDto) {
    await this.helloRepository.update(id, updateHelloDto);
    return await this.getHelloById(id);
  }

  async deleteHello(id: number) {
    const hello = await this.getHelloById(id);
    await this.helloRepository.delete(id);
    return hello;
  }

  async getHelloById(id: number) {
    const result = await this.helloRepository.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException('Hello not found');
    }
    return result;
  }

  async getAllHello() {
    return await this.helloRepository.find();
  }
  async getUniqueMessage() {
    return await this.helloRepository
      .createQueryBuilder('hello')
      .select('hello.message as unique_message')
      .groupBy('hello.message')
      .getRawMany();
  }
}
