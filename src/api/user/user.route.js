import {Router} from 'express';
import User from './user.model';
import response from '../../middleware/response';
import auth from '../../middleware/auth';
import UserController from './user.controller';

const router = Router();

const userCtrl = new UserController(User);

router.route('/users/me')
	.get(auth, userCtrl.currentUser, response)
	.put(auth, userCtrl.updateMe, response);

export default router;
