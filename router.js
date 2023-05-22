import Router from 'express'
import UserController from './users/UserController.js';
import ProjectController from './project/ProjectController.js';

const router = new Router()

router.post('/users', UserController.createUser)
router.put('/users', UserController.updateUser)
router.put('/users/password', UserController.updatePassword)
router.get('/users', UserController.getUsers)
router.get('/users/:name', UserController.getUser)

router.post('/projects', ProjectController.createProject)
router.put('/projects', ProjectController.editeProject)
// router.get('/projects', ProjectController.getProjects)
router.post('/projects/search', ProjectController.getProjects)
router.get('/projects/:name', ProjectController.getProject)
router.delete('/projects/:id', ProjectController.deleteProject)


export default router;

