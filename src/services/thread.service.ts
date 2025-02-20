import { CreateThreadDTO, UpdateThreadDTO } from '../dtos/thread.dto';
import { prisma } from '../libs/prisma';

class ThreadService {
  async getThreads() {
    return await prisma.thread.findMany();
  }

  async getThreadById(id: string) {
    return await prisma.thread.findFirst({
      where: { id },
      include: {
        replies: true,
        likes: true,
      },
    });
  }

  async getThreadByUserId(userId: string) {
    return await prisma.thread.findMany({
      where: { userId },
      include: {
        replies: true,
        likes: true,
      },
    });
  }

  // username
  async getThreadbyUsername() {}

  async createThread(userId: string, thread: CreateThreadDTO) {
    const { content, Images } = thread;
    return await prisma.thread.create({
      data: {
        Images,
        content,
        userId,
      },
    });
  }

  async updateThread(id: string, thread: UpdateThreadDTO) {
    const { content, Images } = thread;
    return await prisma.thread.update({
      where: { id },
      data: {
        content,
        Images,
      },
    });
  }

  async deleteThread(id: string) {
    return await prisma.thread.delete({
      where: { id },
    });
  }
}

export default new ThreadService();
