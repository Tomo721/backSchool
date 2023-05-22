import Router from 'express'
import UserController from './users/UserController.js';
import ProjectController from './projects/ProjectController.js';
import StatusController from './statuses/StatusController.js';


const router = new Router()

router.post('/users', UserController.createUser)
router.put('/users', UserController.updateUser)
router.put('/users/password', UserController.updatePassword)
// router.get('/users', UserController.getUsers)
router.post('/users/search', UserController.getUsers)
router.get('/users/:name', UserController.getUser)

router.post('/projects', ProjectController.createProject)
router.put('/projects', ProjectController.editeProject)
// router.get('/projects', ProjectController.getProjects)
router.post('/projects/search', ProjectController.getProjects)
router.get('/projects/:name', ProjectController.getProject)
router.delete('/projects/:id', ProjectController.deleteProject)

router.get('/statuses', StatusController.getStatuses)


export default router;

