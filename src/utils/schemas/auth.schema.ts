import Joi from '../../../node_modules/joi/lib/index';

import {
  ChangePasswordDTO,
  LoginDTO,
  RegisterDTO,
  ResetPasswordDTO,
  forgotPasswordDTO,
} from '../../dtos/auth.dto';

export const loginSchema = Joi.object<LoginDTO>({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const registerSchema = Joi.object<RegisterDTO>({
  fullName: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  username: Joi.string().min(4).max(12).required(),
  password: Joi.string().min(8).required(),
});

export const forgotPasswordSchema = Joi.object<forgotPasswordDTO>({
  email: Joi.string().email().required(),
});

export const ResetPasswordSchema = Joi.object<ResetPasswordDTO>({
  newPassword: Joi.string().min(8).required(),
});

export const ChangePasswordSchema = Joi.object<ChangePasswordDTO>({
  oldPassword: Joi.string().min(8).required(),
  newPassword: Joi.string().min(8).required(),
});
