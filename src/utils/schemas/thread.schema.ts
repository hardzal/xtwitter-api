import Joi from 'joi';
import {
  CreateThreadDTO,
  DeleteThreadDTO,
  UpdateThreadDTO,
} from '../../dtos/thread.dto';

export const createThreadSchema = Joi.object<CreateThreadDTO>({
  content: Joi.string().max(200).allow(''), // default optional
  images: Joi.string().optional(),
}).or('content', 'images');

export const updateThreadSchema = Joi.object<UpdateThreadDTO>({
  content: Joi.string().max(200).allow(''), // default optional
  images: Joi.string().optional().allow(''),
}).or('content', 'images');

export const deleteThreadSchema = Joi.object<DeleteThreadDTO>({
  id: Joi.string().uuid(),
});
