import { Injectable } from '@nestjs/common';
import { RegistrationDto } from '../../dto/registration.dto';

import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { PasswordService } from 'src/modules/password/services/password/password.service';

import { UserAlreadyExistsException } from '../../exceptions/user-already-exists.exception';

@Injectable()
export class ClientRegistrationService {
  constructor(
    private prismaService: PrismaService,
    private passwordService: PasswordService,
  ) {}

  public async registration({ email, name, phone, password }: RegistrationDto) {
    const existingUser = await this.prismaService.userClient.findUnique({ where: { email } });

    if (existingUser) {
      throw new UserAlreadyExistsException();
    }

    const [addedByOtherUser, passwordHash] = await Promise.all([
      this.prismaService.userClient.findFirst({ where: { phone } }),
      this.passwordService.generatePasswordHash(password),
    ]);

    const data = {
      email,
      name,
      phone,
      passwordHash,
    };

    if (addedByOtherUser) {
      await this.prismaService.userClient.update({
        where: {
          id: addedByOtherUser.id,
        },
        data,
      })
    } else {
      await this.prismaService.userClient.create({
        data,
      });
    }
  }
}
