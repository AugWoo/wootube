import express from 'express';
import {
  edit,
  logout,
  see,
  startGithubLogin,
  finishGithubLogin,
  startKakaoLogin,
  finishKakaoLogin,
} from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/edit', edit);
userRouter.get('/logout', logout);
userRouter.get('/github/start', startGithubLogin);
userRouter.get('/github/finish', finishGithubLogin);
userRouter.get('/kakao/start', startKakaoLogin);
userRouter.get('/kakao/finish', finishKakaoLogin);
userRouter.get('/:id', see);

export default userRouter;
