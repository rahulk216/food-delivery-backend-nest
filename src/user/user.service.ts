import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3Service } from '../s3/s3.service';
import { toKebabCase } from 'src/utility';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly s3Service: S3Service,
  ) {}
  async createAddress(body): Promise<any> {
    const response = await this.prismaService.address.create({
      data: body,
    });
    return response;
  }

  async updateUserImage(id, file): Promise<any> {
    const userExists = await this.prismaService.user.findUnique({
      where: { id: id },
    });
    console.log(userExists);

    if (!userExists) throw new Error();
    const key = `user-images/${id}/${id}${Date.now()}`;
    const imageUrl = await this.s3Service.uploadFile(file, key);

    const imageUpdatedUser = await this.prismaService.user.update({
      where: { id: id },
      data: { image: imageUrl },
    });
    return imageUpdatedUser;
  }
}
