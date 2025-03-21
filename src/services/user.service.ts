import {
  CreateUserDTO,
  UpdateProfileDTO,
  UpdateUserDTO,
} from '../dtos/user.dto';
import { prisma } from '../libs/prisma';

class UserService {
  async getUsers() {
    return await prisma.user.findMany({
      include: {
        profile: true,
      },
    });
  }

  async getUserById(id: string, isPassword: boolean = true) {
    return await prisma.user.findFirst({
      where: { id },
      select: {
        username: true,
        email: true,
        password: isPassword,
        profile: true,
      },
    });
  }

  async getUserByEmail(email: string, isPassword: boolean = true) {
    return await prisma.user.findUnique({
      select: {
        id: true,
        username: true,
        email: true,
        password: isPassword,
        profile: true,
      },
      where: { email }, // fixed by add unique attribute to email
    });
  }

  async getUserByUsername(username: string) {
    return await prisma.user.findFirst({
      where: { username },
      select: {
        id: true,
        username: true,
        email: true,
        profile: true,
        threads: true,
      },
    });
  }

  async getUserSearch(search?: string) {
    if (search) {
      return await prisma.user.findMany({
        include: {
          profile: true,
        },
        where: {
          OR: [
            {
              username: {
                contains: search,
              },
            },
          ],
        },
      });
    }

    return await prisma.user.findMany({
      include: {
        profile: true,
      },
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

  async updateProfileById(id: string, data: UpdateProfileDTO) {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }
}

export default new UserService();
