import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { S3Module } from 'src/s3/s3.module';
import { S3Service } from '../s3/s3.service';

@Module({
  controllers: [MenuController],
  providers: [MenuService, S3Service],
  imports: [S3Module],
})
export class MenuModule {}
