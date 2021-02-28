import {Router} from 'express';

import auth from './auth/auth.route';
import user from './user/user.route';

const router = Router();

router.use(auth);
router.use(user);

export default router;
