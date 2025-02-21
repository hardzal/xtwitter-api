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
      },
    });
  }

  async getRepliesByThreadId(threadId: string) {
    return await prisma.reply.findMany({
      where: { threadId },
      include: {
        user: true,
        thread: true,
      },
    });
  }

  async getReplyByUserId(userId: string) {
    return await prisma.reply.findMany({
      where: { userId },
      include: {
        user: true,
        thread: true,
      },
    });
  }

  async createReply(data: CreateReplyDTO) {
    return await prisma.reply.create({
      data,
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
