import Router from 'express'
import UserController from './users/UserController.js'
import ProjectController from './projects/ProjectController.js'
import StatusController from './statuses/StatusController.js'
import TaskController from './tasks/TaskController.js'
import AuthController from './auth/AuthController.js'
import AuthMiddleware from './auth/AuthMiddleware.js'

const router = new Router()

router.post('/registration', AuthController.registration)
router.post('/login', AuthController.login)

// router.post('/users', UserController.createUser)
router.put('/users', AuthMiddleware.AuthUserCheck, UserController.updateUser)
router.put('/users/password', AuthMiddleware.AuthUserCheck, UserController.updatePassword)
router.post('/users/search', AuthMiddleware.AuthUserCheck, UserController.getUsers)
router.get('/users/:name', AuthMiddleware.AuthUserCheck, UserController.getUser)

router.post('/projects', AuthMiddleware.AuthUserCheck, ProjectController.createProject)
router.put('/projects', AuthMiddleware.AuthUserCheck, ProjectController.editeProject)
router.post('/projects/search', AuthMiddleware.AuthUserCheck, ProjectController.getProjects)
router.get('/projects/:id', AuthMiddleware.AuthUserCheck, ProjectController.getProject)
router.delete('/projects/:id', AuthMiddleware.AuthUserCheck, ProjectController.deleteProject)

router.get('/statuses', AuthMiddleware.AuthUserCheck, StatusController.getStatuses)

router.post('/tasks', TaskController.createTask)
router.put('/tasks', TaskController.editeTask)
router.post('/tasks/search', TaskController.getTasks)
router.get('/tasks/:id', TaskController.getTask)
router.delete('/tasks/:id', TaskController.deleteTask)

export default router;

