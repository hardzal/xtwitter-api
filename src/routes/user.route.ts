import express from 'express';
import userController from '../controllers/user.controller';
import { authCheck } from '../middlewares/auth-check.middleware';

const router = express.Router();

router.get('/', authCheck, userController.getUsers);
router.get('/search', authCheck, userController.getUserSearch);
router.get('/:id', authCheck, userController.getUserById);
router.post('/', authCheck, userController.createUser);
router.patch('/:id', authCheck, userController.updateUserById);
router.delete('/:id', authCheck, userController.deleteUserById);

export default router;
