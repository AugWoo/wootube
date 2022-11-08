import express from 'express';
import {
  edit,
  logout,
  see,
  startGithubLogin,
  finishGithubLogin,
} from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/edit', edit);
userRouter.get('/logout', logout);
userRouter.get('/github/start', startGithubLogin);
userRouter.get('/github/finish', finishGithubLogin);
userRouter.get('/:id', see);

export default userRouter;
