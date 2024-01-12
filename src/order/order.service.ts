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

    const createdPayment = await this.prismaService.payment.create({
      data: {
        payment_status:
          payload.order_type === 'CASH_ON_DELIVERY'
            ? 'COD_PENDING'
            : 'PROCESSING',
        order: {
          connect: { id: createdOrder.id },
        },
      },
    });

    return await this.getOrderById(createdOrder.id);
  }

  async getAllOrders() {
    const orders = await this.prismaService.order.findMany();
    if (orders) return orders;
  }

  async getOrderById(id: number) {
    const order = await this.prismaService.order.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            username: true,
            email: true,
            phone: true,
          },
        },
        payment: true,
      },
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
