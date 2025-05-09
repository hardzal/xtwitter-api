import { CreateReplyDTO, UpdateReplyDTO } from '../dtos/reply.dto';
import { prisma } from '../libs/prisma';

class ReplyService {
  async getReplies() {
    return await prisma.reply.findMany();
  }

  async getReplyById(id: string) {
    return await prisma.reply.findFirst({
      where: { id },
      include: {
        user: true,
        thread: true,
        likeReply: true,
      },
    });
  }

  async getRepliesByThreadId(threadId: string) {
    return await prisma.reply.findMany({
      where: { threadId },
      include: {
        user: {
          omit: {
            password: true,
          },
          include: {
            profile: true,
          },
        },
        thread: true,
        likeReply: true,
      },
    });
  }

  async getReplyByUserId(userId: string) {
    return await prisma.reply.findMany({
      where: { userId },
      include: {
        user: true,
        thread: true,
        likeReply: true,
      },
    });
  }

  async createReply(userId: string, threadId: string, data: CreateReplyDTO) {
    const { content } = data;
    return await prisma.reply.create({
      data: {
        threadId,
        userId,
        content,
      },
    });
  }

  async updateReplyById(id: string, data: UpdateReplyDTO) {
    return await prisma.reply.update({
      where: { id },
      data,
    });
  }

  async deleteReplyById(id: string) {
    return await prisma.reply.delete({
      where: { id },
    });
  }
}

export default new ReplyService();
