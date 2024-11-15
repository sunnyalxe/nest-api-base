import { Module } from '@nestjs/common';
import { HelloController } from './hello.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hello } from './entities/hello.entity';
import { HelloService } from './hello.service';

@Module({
  imports: [TypeOrmModule.forFeature([Hello])],
  providers: [HelloService],
  controllers: [HelloController],
})
export class HelloModule {}
