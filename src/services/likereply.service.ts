import { prisma } from '../libs/prisma';

class LikeReplyService {
  async getLikeById(id: string) {
    return await prisma.likeReply.findFirst({
      where: { id },
      include: {
        reply: true,
        user: true,
      },
    });
  }

  // mendapatkan user like by thread
  async getLike(userId: string, replyId: string) {
    return await prisma.likeReply.findFirst({
      where: { userId, replyId },
      include: {
        user: true,
        reply: true,
      },
    });
  }

  // mendapatkan all likes by userId
  async getLikesByUserId(userId: string) {
    return await prisma.likeReply.findMany({
      where: { userId },
      include: {
        reply: true,
        user: true,
      },
    });
  }

  // mendapatkan all likes by threadId
  async getLikesByThreadId(replyId: string) {
    return await prisma.likeReply.findMany({
      where: { replyId },
      include: {
        reply: true,
        user: true,
      },
    });
  }

  // create likes
  async createLike(userId: string, replyId: string) {
    return await prisma.likeReply.create({
      data: {
        userId,
        replyId,
      },
    });
  }

  // delete likes by id
  async deleteLikeById(id: string) {
    return await prisma.likeReply.delete({
      where: { id },
    });
  }
}

export default new LikeReplyService();
