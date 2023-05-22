import Router from 'express'
import UserController from './users/UserController.js';

const router = new Router()

router.post('/users', UserController.createUser)
router.put('/users', UserController.updateUser)
router.put('/users/password', UserController.updatePassword)
router.get('/users', UserController.getUsers)
router.get('/users/:name', UserController.getUser)

export default router;

