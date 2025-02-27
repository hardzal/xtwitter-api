import Joi from 'joi';
import { CreateProfileDTO, UpdateProfileDTO } from '../../dtos/profile.dto';

export const createProfileSchema = Joi.object<CreateProfileDTO>({
  fullName: Joi.string().max(100).required(),
  avatar: Joi.string().optional(),
  bannerURL: Joi.string().optional(),
  bio: Joi.string().optional(),
  userId: Joi.string().uuid().required(),
});

export const updateProfileSchema = Joi.object<UpdateProfileDTO>({
  fullName: Joi.string().max(100).required(),
  avatar: Joi.string().optional(),
  bannerURL: Joi.string().optional(),
  bio: Joi.string().optional(),
});
