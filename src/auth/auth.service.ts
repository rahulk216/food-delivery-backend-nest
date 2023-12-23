import { PrismaService } from './../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface SigninParams {
  email: string;
  password: string;
}

interface SignupParams {
  email: string;
  password: string;
  name: string;
  phone: string;
  username: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signIn(user) {
    const payload = {
      username: user.email,
      sub: {
        name: user.name,
      },
    };
    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async signUp({ email, password, name, phone, username }: SignupParams) {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      throw new UnauthorizedException();
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prismaService.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        username,
        phone,
      },
    });
    // const token = await generateJWT(name, user.id, UserType.ADMIN);
    return user;
  }

  async logout() {
    return 'logged out';
  }

  async refreshToken(user) {
    const payload = {
      username: user.email,
      sub: {
        name: user.name,
      },
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
