import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async createAddress(body): Promise<any> {
    const response = await this.prismaService.address.create({
      data: body,
    });
    return response;
  }
}
