import Joi from 'joi';
import { CreateThreadDTO } from '../../dtos/thread.dto';

export const createThreadSchema = Joi.object<CreateThreadDTO>({
  content: Joi.string().max(200),
  Images: Joi.string(),
});
