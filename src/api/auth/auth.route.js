import {Router} from 'express';
import auth from '../../middleware/auth';
import Auth from './auth.controller';

const router = Router();

router.post('/signIn', Auth.signIn);

export default router;

