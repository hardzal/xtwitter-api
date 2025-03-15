import { prisma } from '../libs/prisma';

class FollowService {
  async getFollowsDetails(followedId: string, followingId: string) {
    return await prisma.follow.findFirst({
      where: { followedId, followingId },
    });
  }

  // followers -> user followers
  async getFollowers(followedId: string) {
    return await prisma.follow.findMany({
      where: { followedId },
      include: {
        following: {
          include: {
            profile: true,
          },
        },
      },
    });
  }

  async getFollowings(followingId: string) {
    return await prisma.follow.findMany({
      where: { followingId },
      include: {
        followed: {
          include: {
            profile: true,
          },
        },
      },
    });
  }

  async createFollow(followedId: string, followingId: string) {
    return await prisma.follow.create({
      data: {
        followedId,
        followingId,
      },
    });
  }

  async deleteFollow(id: string) {
    return await prisma.follow.delete({
      where: { id },
    });
  }
}

export default new FollowService();

// misalkan
// gw disini sebagai user A ingin menfollow user b
// -> followed_id, following_id
// -> user_b_id, user_a_id
// user b-> follow back user a maka
// -> user_a_id, user_b_id
