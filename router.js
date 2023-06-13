import Router from 'express'
import UserController from './users/UserController.js'
import ProjectController from './projects/ProjectController.js'
import StatusController from './statuses/StatusController.js'
import TaskController from './tasks/TaskController.js'
import CommentController from './comments/CommentController.js'
import TimeController from './times/TimeController.js'
import HystoryController from './hystory/HystoryController.js'

import AuthController from './auth/AuthController.js'
import AuthMiddleware from './auth/AuthMiddleware.js'

const router = new Router()

router.post('/registration', AuthController.registration)
router.post('/login', AuthController.login)

router.put('/users', AuthMiddleware.AuthUserCheck, UserController.updateUser)
router.put('/users/password', AuthMiddleware.AuthUserCheck, UserController.updatePassword)
router.put('/users/status', AuthMiddleware.AuthUserCheck, UserController.updateStatus)
router.post('/users/search', AuthMiddleware.AuthUserCheck, UserController.getUsers)
// router.get('/users/:name', AuthMiddleware.AuthUserCheck, UserController.getUser)

router.post('/projects', AuthMiddleware.AuthUserCheck, ProjectController.createProject)
router.put('/projects', AuthMiddleware.AuthUserCheck, ProjectController.editeProject)
router.post('/projects/search', AuthMiddleware.AuthUserCheck, ProjectController.getProjects)
router.get('/projects/:id', AuthMiddleware.AuthUserCheck, ProjectController.getProject)
router.delete('/projects/:id', AuthMiddleware.AuthUserCheck, ProjectController.deleteProject)

router.get('/statuses', AuthMiddleware.AuthUserCheck, StatusController.getStatuses)

router.post('/tasks', AuthMiddleware.AuthUserCheck, TaskController.createTask)
router.put('/tasks', AuthMiddleware.AuthUserCheck, TaskController.editeTask)
router.post('/tasks/search', AuthMiddleware.AuthUserCheck, TaskController.getTasks)
router.get('/tasks/:id', AuthMiddleware.AuthUserCheck, TaskController.getTask)
router.delete('/tasks/:id', AuthMiddleware.AuthUserCheck, TaskController.deleteTask)

router.post('/comments', AuthMiddleware.AuthUserCheck, CommentController.createComment)
router.put('/comments', AuthMiddleware.AuthUserCheck, CommentController.editeComment)
router.get('/comments/:id', AuthMiddleware.AuthUserCheck, CommentController.getComments)
router.delete('/comments/:id', AuthMiddleware.AuthUserCheck, CommentController.deleteComment)

router.put('/times', AuthMiddleware.AuthUserCheck, TimeController.editeTime)

router.get('/hystory/:id', AuthMiddleware.AuthUserCheck, HystoryController.getHystory)

export default router;

