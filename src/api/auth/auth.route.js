import {Router} from 'express';
import Auth from './auth.controller';

const router = Router();

router.post('/login', Auth.login);

export default router;

