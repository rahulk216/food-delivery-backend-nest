import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { MenuModule } from './menu/menu.module';
import { S3Module } from './s3/s3.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, MenuModule, S3Module, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
