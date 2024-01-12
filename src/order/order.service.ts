import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}
  async createOrder(body) {
    const { userId, ...payload } = body;
    payload['user'] = { connect: { id: userId } };
    const createdOrder = await this.prismaService.order.create({
      data: payload,
    });
    return createdOrder;
  }

  async getAllOrders() {
    const orders = await this.prismaService.order.findMany();
    if (orders) return orders;
  }

  async getOrderById(id: number) {
    const order = await this.prismaService.order.findUnique({
      where: { id },
    });

    return order;
  }

  async updateOrder(id: string, body) {
    console.log(id, body);
  }

  async deleteOrder(id: string) {
    console.log(id);
  }
}
