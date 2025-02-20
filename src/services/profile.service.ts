import { CreateProfileDTO, UpdateProfileDTO } from '../dtos/profile.dto';
import { prisma } from '../libs/prisma';

class ProfileService {
  async getProfiles() {
    return await prisma.profile.findMany();
  }

  async getProfileById(id: string) {
    return await prisma.profile.findFirst({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  async getProfileByUsername() {}

  async createProfile(data: CreateProfileDTO) {
    return await prisma.profile.create({
      data: data,
    });
  }

  async UpdateProfileById(id: string, data: UpdateProfileDTO) {
    return await prisma.profile.update({
      where: { id },
      data: data,
    });
  }

  async deleteProfile(id: string) {
    return await prisma.profile.delete({
      where: { id },
    });
  }
}

export default new ProfileService();
