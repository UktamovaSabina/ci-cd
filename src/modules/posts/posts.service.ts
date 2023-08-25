import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(body: any) {
    try {
      const { id, ...others } = body;
      if(!id || !others.title){
        throw new HttpException(`Enter ${!id? "id": ''} ${!id && !others.title? "and": ''} ${!others.title? "title": ''}`, HttpStatus.BAD_REQUEST);
      }
      let res = await this.prisma.post.create({
        data: {
          ...others,
          author: { connect: { id } },
        }
      });
      
      return res
    } catch (error) {
      return{
        status: error?.status,
        message: error
      };
      
    }
  }

  async findAll() {
    try {
      let res = this.prisma.post.findMany({ include: { author: true } });
      if (!res) {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }
      return res
    } catch (error) {
      return {
        status: error.status,
        message: error.message
      }
    }
  }

  async findOne(id: number) {
    try {
      let res = await this.prisma.post.findFirst({ where: { id } });
      if (!res) {
        throw new HttpException('Post is not found', HttpStatus.BAD_REQUEST);
      }
      return res
    } catch (error) {
      return {
        status: error.status,
        message: error.message
      }
    }
  }

  async update(id: number, body: any) {
    try {
      let res = await this.prisma.post.update({where: {id}, data: body});
      if(!res){
        throw new HttpException('Post is not found', HttpStatus.BAD_REQUEST);
      }
      return res
    } catch (error) {
      return {
        status: error.status,
        message: error.message
      }
    }
  }

  async remove(id: number) {
    try {
      const res = await this.prisma.post.delete({where: {id}});
      if(!res){
        throw new HttpException('Post is not found', HttpStatus.BAD_REQUEST);
      }
      return res
    } catch (error) {
      return {
        status: error.status,
        message: error.message
      }
    }
  }
}
