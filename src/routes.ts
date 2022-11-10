import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { AuthController } from './controllers/AuthController';
import { AuthMiddleware } from './middlewares/auth';
import { PostController } from './controllers/PostController';

const userController = new UserController();  
const authController = new AuthController();
const postController = new PostController();

export const router = Router();

router.post('/create', userController.store);
router.get('/users', AuthMiddleware, userController.index);
router.get('/user/:id', AuthMiddleware, userController.findUser);
router.put('/user/:id', AuthMiddleware, userController.updateUser);
router.delete('/user/:id', AuthMiddleware, userController.updateUser)
router.post("/auth", authController.authenticate)


router.post('/post/user/:id', postController.createPost)
router.get('/posts', postController.listAllPosts)
router.put('/post/user/:id', postController.updatePost)
router.delete('/post/:id', postController.delete)
