import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateHelloDto, UpdateHelloDto } from './dto/hello.dto';
import { HelloService } from './hello.service';
import { ParseIntPipe } from 'src/Exception/parse-int.pipe';
import { SuccessMessage } from 'src/Decorators/success-message.decorator';

//route will be http://localhost:4000/hello/
@Controller('hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}
  @Get('jai')
  hello() {
    return this.helloService.getHello();
  }

  @Post()
  @SuccessMessage('Hello created successfully')
  async create(@Body() createHelloDto: CreateHelloDto) {
    return await this.helloService.createHello(createHelloDto);
  }

  @Patch(':id')
  @SuccessMessage('Hello updated successfully')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateHelloDto: UpdateHelloDto) {
    return await this.helloService.updateHello(id, updateHelloDto);
  }

  @Delete(':id')
  @SuccessMessage('Hello updated successfully')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.helloService.deleteHello(id);
  }

  @Get()
  @SuccessMessage('Hello listed successfully')
  async getAllHello() {
    return await this.helloService.getAllHello();
  }

  @Get('unique')
  @SuccessMessage('Hello unique message listed successfully')
  async getUniqueMessage() {
    return await this.helloService.getUniqueMessage();
  }

  //:id should always be at bottom so it can not overwrite other routes like "unique"
  @Get(':id')
  @SuccessMessage('Hello found successfully')
  async getHelloById(@Param('id', ParseIntPipe) id: number) {
    return await this.helloService.getHelloById(id);
  }
}
