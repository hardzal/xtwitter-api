import { Request, Response, NextFunction } from 'express';
import profileService from '../services/profile.service';
import { updateProfileSchema } from '../utils/schemas/profile.schema';
import { uploadImageMulti } from '../utils/upload';

class ProfileController {
  async getProfiles(req: Request, res: Response, next: NextFunction) {
    try {
      const profiles = await profileService.getProfiles();

      res.status(200).json({
        message: 'succesfully get all profiles',
        data: profiles,
      });
    } catch (error) {
      next(error);
    }
    return;
  }

  async getProfileById(req: Request, res: Response, next: NextFunction) {
    try {
      let profile;

      if (req.query.id) {
        const id = req.query.id as string;
        profile = await profileService.getProfileById(id);
      } else {
        const id = req.user.id;
        profile = await profileService.getProfileByUserId(id);
      }

      res.status(200).json({
        message: 'succesfully get profile data',
        data: profile,
      });
    } catch (error) {
      next(error);
    }
    return;
  }

  async getProfileByUsername(req: Request, res: Response, next: NextFunction) {
    try {
      const { username } = req.params;

      const profile = await profileService.getProfileByUsername(username);

      res.status(200).json({
        message: 'succesfully get profile data',
        data: profile,
      });
    } catch (error) {
      next(error);
    }
    return;
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    /*  #swagger.requestBody = {
            required: true,
            content: {
              "multipart/form-data": {
                    schema: {
                        $ref: "#/components/schemas/UpdateProfileDTO"
                    }  
                }
            }
        } 
    */
    try {
      const { id } = req.params;
      const folders = ['dumbways/avatar', 'dumbways/bannerURL'];
      let avatarURL: string | undefined;
      let bannerURL: string | undefined;
      let files;
      let imageResults: Record<string, string> = {};

      if (req.files) {
        files = req.files as unknown as Record<string, Express.Multer.File[]>;

        imageResults = await uploadImageMulti(folders, files);
        avatarURL = imageResults['avatar'];
        bannerURL = imageResults['bannerURL'];
      }

      const body = {
        ...req.body,
        avatar: avatarURL,
        bannerURL: bannerURL,
      };

      const vaidatedBody = await updateProfileSchema.validateAsync(body);
      const profile = await profileService.UpdateProfileById(id, vaidatedBody);

      res.json({
        message: 'succesfully updated profile user',
        data: profile,
      });
    } catch (error) {
      next(error);
    }
    return;
  }
}

export default new ProfileController();
