import Router from 'express'
import UserController from './users/UserController.js';
import ProjectController from './projects/ProjectController.js';
import StatusController from './statuses/StatusController.js';
import TaskController from './tasks/TaskController.js';


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
router.get('/projects/:id', ProjectController.getProject)
router.delete('/projects/:id', ProjectController.deleteProject)

router.get('/statuses', StatusController.getStatuses)

router.post('/tasks', TaskController.createTask)
router.put('/tasks', TaskController.editeTask)
router.post('/tasks/search', TaskController.getTasks)
router.get('/tasks/:id', TaskController.getTask)
router.delete('/tasks/:id', TaskController.deleteTask)

export default router;

