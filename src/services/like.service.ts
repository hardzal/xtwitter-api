import { prisma } from '../libs/prisma';

class LikeService {
  // mendapatkan all likes
  async getLikes() {
    return await prisma.like.findMany();
  }

  async getLikeById(id: string) {
    return await prisma.like.findFirst({
      where: { id },
      include: {
        user: true,
        thread: true,
      },
    });
  }

  // mendapatkan user like by thread
  async getLike(userId: string, threadId: string) {
    return await prisma.like.findFirst({
      where: { userId, threadId },
      include: {
        user: true,
        thread: true,
      },
    });
  }

  // mendapatkan all likes by userId
  async getLikesByUserId(userId: string) {
    return await prisma.like.findMany({
      where: { userId },
      include: {
        thread: true,
        user: true,
      },
    });
  }

  // mendapatkan all likes by threadId
  async getLikesByThreadId(threadId: string) {
    return await prisma.like.findMany({
      where: { threadId },
      include: {
        thread: true,
        user: true,
      },
    });
  }

  // create likes
  async createLike(userId: string, threadId: string) {
    return await prisma.like.create({
      data: {
        userId,
        threadId,
      },
    });
  }

  // delete likes by id
  async deleteLikeById(id: string) {
    return await prisma.like.delete({
      where: { id },
    });
  }
}
export default new LikeService();
