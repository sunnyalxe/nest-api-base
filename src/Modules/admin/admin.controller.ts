import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { listAdminDto } from './dto/list-admin.dto';
import { SuccessMessage } from 'src/Decorators/success-message.decorator';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminsService: AdminService) {}
  @Get()
  @SuccessMessage('Found')
  getAllAdmin(@Query() listAdminDto: listAdminDto) {
    return this.adminsService.getAllAdmin(listAdminDto);
  }
  @Post()
  @SuccessMessage('Admin created successfully')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.createAdmin(createAdminDto);
  }
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.updateAdmin(id, updateAdminDto);
  }
  @Get(':id')
  getAdmin(@Param('id') id: number) {
    return this.adminsService.getAdminById(id);
  }
}
