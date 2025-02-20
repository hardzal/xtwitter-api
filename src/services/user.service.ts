import { CreateUserDTO, UpdateUserDTO } from '../dtos/user.dto';
import { prisma } from '../libs/prisma';

class UserService {
  async getUsers() {
    return await prisma.user.findMany();
  }

  async getUserById(id: string) {
    return await prisma.user.findFirst({
      where: { id },
      include: {
        profile: true,
      },
    });
  }

  async getUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email }, // fixed by add unique attribute to email
    });
  }

  async createUser(data: CreateUserDTO) {
    const { fullName, ...userData } = data;
    return await prisma.user.create({
      data: {
        ...userData,
        profile: {
          create: { fullName },
        },
      },
    });
  }

  async deleteUserById(id: string) {
    return await prisma.user.delete({
      where: { id },
    });
  }

  async updateUserById(id: string, data: UpdateUserDTO) {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }
}

export default new UserService();
