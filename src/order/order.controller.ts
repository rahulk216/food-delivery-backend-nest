import {
  Controller,
  Body,
  Param,
  Post,
  Get,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

import { createOrderDto } from './dtos/order.dtos';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtGuard)
  @Post('/')
  async createOrder(@Body() body: createOrderDto) {
    return this.orderService.createOrder(body);
  }

  @UseGuards(JwtGuard)
  @Get('/')
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @UseGuards(JwtGuard)
  @Get('/:id')
  async getOrderById(@Param('id') id: number) {
    return this.orderService.getOrderById(id);
  }

  @UseGuards(JwtGuard)
  @Put('/:id')
  async updateOrder(@Param('id') id: string, @Body() body) {
    return this.orderService.updateOrder(id, body);
  }

  @UseGuards(JwtGuard)
  @Delete('/:id')
  async deleteOrder(@Param('id') id: string) {
    return this.orderService.deleteOrder(id);
  }
}
