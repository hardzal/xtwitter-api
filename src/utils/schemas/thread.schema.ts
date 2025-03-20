import Joi from 'joi';
import {
  CreateThreadDTO,
  DeleteThreadDTO,
  UpdateThreadDTO,
} from '../../dtos/thread.dto';

export const createThreadSchema = Joi.object<CreateThreadDTO>({
  content: Joi.string().max(200),
  images: Joi.string().optional(),
});

export const updateThreadSchema = Joi.object<UpdateThreadDTO>({
  content: Joi.string().max(200),
  images: Joi.string().optional().allow(''),
});

export const deleteThreadSchema = Joi.object<DeleteThreadDTO>({
  id: Joi.string().uuid(),
});
