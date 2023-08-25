import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: any): Promise<any> {
    try {
      let user = await this.prisma.user.create({ data: data });
      if (!user) {
        throw new HttpException('User is not created', HttpStatus.BAD_REQUEST);
      }
      return user;
    } catch (error) {
      return {
        status: error.status,
        message: error.message
      }
    }
  }

  async findAll(): Promise<any> {
    try {
      let users = await this.prisma.user.findMany();
      if (!users) {
        throw new HttpException('Users not found', HttpStatus.BAD_REQUEST);
      }
      return users;
    } catch (error) {
      return {
        status: error.status,
        message: error.message
      }
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      let user = await this.prisma.user.findFirst({ where: { id } })
      if (!user) {
        throw new HttpException('User is not found', HttpStatus.BAD_REQUEST);
      }
      return user;
    } catch (error) {
      return {
        status: error.status,
        message: error.message
      }
    }
  }
  
  async update(id: number, data: any): Promise<any> {
    try {
      let findUser = await this.prisma.user.findFirst({ where: { id } });
      if (!findUser) {
        throw new HttpException('User is not found', HttpStatus.BAD_REQUEST);
      }
      let user = await this.prisma.user.update({ where: { id }, data: data })
       
      return user;
    } catch (error) {
      return {
        status: error.status,
        message: error.message
      }
    }
  }

  async remove(id: number): Promise<any>  {
    try {
      let findUser = await this.prisma.user.findFirst({ where: { id } });
      if (!findUser) {
        throw new HttpException('User is not found', HttpStatus.BAD_REQUEST);
      }
      let user = await this.prisma.user.delete({ where: { id } });
      return user;
    } catch (error) {
      return {
        status: error.status,
        message: error.message
      }
    }
  }
}
