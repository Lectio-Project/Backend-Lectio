import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AdminGuard } from 'src/guards/authAdmin/authAdmin.guard';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginDto } from './dto/login-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
@ApiTags('Admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('sign-up')
  create(@Body() createAdminDto: CreateAdminDto) {
    if (createAdminDto.password !== createAdminDto.confirmPassword) {
      throw new BadRequestException('As senhas devem ser iguais');
    }
    return this.adminService.create(createAdminDto);
  }

  @Post('sign-in')
  login(@Body() loginDto: LoginDto) {
    return this.adminService.login(loginDto);
  }

  @ApiSecurity('JWT-auth')
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @ApiSecurity('JWT-auth')
  @UseGuards(AdminGuard)
  @Get('profile')
  profile(@Req() req: Request) {
    return this.adminService.findOne(req.admin.id);
  }

  @ApiSecurity('JWT-auth')
  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @ApiSecurity('JWT-auth')
  @UseGuards(AdminGuard)
  @Patch()
  update(@Req() req: Request, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(req.admin.id, updateAdminDto);
  }

  @ApiSecurity('JWT-auth')
  @UseGuards(AdminGuard)
  @Delete()
  remove(@Req() req: Request) {
    return this.adminService.remove(req.admin.id);
  }
}
