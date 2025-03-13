import Joi from 'joi';
import { CreateLikeDTO, DeleteLikeDTO } from '../../dtos/likereply.dto';

export const createLikeSchema = Joi.object<CreateLikeDTO>({
  replyId: Joi.string().uuid(),
});

export const deleteLikeSchema = Joi.object<DeleteLikeDTO>({
  replyId: Joi.string().uuid(),
});
