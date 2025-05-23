import { CreateThreadDTO, UpdateThreadDTO } from '../dtos/thread.dto';
import { prisma } from '../libs/prisma';

class ThreadService {
  async getThreads(pagination?: { limit: number; startIndex: number }) {
    return await prisma.thread.findMany({
      include: {
        user: {
          omit: {
            password: true,
          },
          include: {
            profile: true,
          },
        },
        likes: true,
        replies: true,
      },
      take: pagination?.limit,
      skip: pagination?.startIndex,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getThreadById(id: string) {
    return await prisma.thread.findFirst({
      where: { id },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
        replies: {
          include: {
            user: {
              include: {
                profile: true,
              },
            },
          },
        },
        likes: true,
      },
    });
  }

  async getThreadByUserId(userId: string) {
    return await prisma.thread.findMany({
      where: { userId },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
        replies: {
          include: {
            user: {
              include: {
                profile: true,
              },
            },
          },
        },
        likes: true,
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });
  }

  async createThread(userId: string, thread: CreateThreadDTO) {
    const { content, images } = thread;
    return await prisma.thread.create({
      data: {
        images,
        content,
        userId,
      },
    });
  }

  async updateThread(id: string, thread: UpdateThreadDTO) {
    const { content, images } = thread;

    return await prisma.thread.update({
      where: { id },
      data: {
        content,
        images,
      },
    });
  }

  async deleteThread(id: string) {
    return await prisma.thread.delete({
      where: { id },
    });
  }

  async getAllImagesByUserId(userId: string) {
    return await prisma.thread.findMany({
      where: { userId },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
        likes: true,
        replies: true,
      },
    });
  }
}

export default new ThreadService();
