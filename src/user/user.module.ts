import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { S3Module } from 'src/s3/s3.module';
import { S3Service } from 'src/s3/s3.service';
@Module({
  providers: [UserService, S3Service],
  controllers: [UserController],
  imports: [S3Module],
})
export class UserModule {}
