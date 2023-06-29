import TaskService from './TaskService.js';
import Project from '../projects/Project.js';
import Task from './Task.js';
import StatusService from '../statuses/StatusService.js';
import HystoryFields from '../hystory/HystoryFields.js';
import Hystory from '../hystory/Hystory.js';
import User from '../users/User.js';
import mongoose from 'mongoose'

class TaskController {

    async createTask(req, res) {
        try {
            let payload = req.body

            payload.author = req.user.id
            payload.executor = payload.executor || req.user.id
            payload.dateCreated = new Date().toISOString()

            Project.findById(payload.projectId).exec(function (error) {
                if (error) {
                    return res.status(500).json({ message: 'Такого проекта не существует' })
                }
            });

            const taskBD = await Task.find()
            const taskBDFilteredProject = taskBD.filter(x => x.projectId === payload.projectId)

            if (taskBD && taskBD.length === 0 || taskBDFilteredProject && taskBDFilteredProject.length === 0) {
                payload.number = 1
            } else {
                payload.number = taskBDFilteredProject.length + 1
            }
            if (payload.status && StatusService.getStatuses().indexOf(payload.status) === -1) {
                return res.status(500).json({ message: 'Такого статуса не существует' })
            }

            const task = await TaskService.createTask(payload)
            res.json(task)
        }
        catch (e) {
            res.status(500).json(e)
        }
    }
    async editeTask(req, res) {
        try {
            let payload = req.body

            if (!payload._id) {
                return res.status(500).json({ message: 'id не указан' })
            }

            const authorAuth = req.user.id
            payload.author = authorAuth
            payload.authorEdited = authorAuth
            payload.dateEdited = new Date().toISOString()

            const taskBD = await Task.findById(payload._id)

            if (taskBD.author !== authorAuth) {
                payload.name = taskBD.name
                payload.description = taskBD.description
            }
            if (payload.projectId) {
                Project.findById(payload.projectId).exec(function (error) {
                    if (error) {
                        return res.status(500).json({ message: 'Такого проекта не существует' })
                    }
                });

                const taskBDList = await Task.find()
                const taskBDFilteredProject = taskBDList.filter(x => x.projectId === payload.projectId)
                payload.number = taskBDFilteredProject.length + 1
            }
            if (payload.executor) {
                User.findById(payload.executor).exec(function (error) {
                    if (error) {
                        return res.status(500).json({ message: 'Такого пользователя не существует' })
                    }
                });
            }

            if (payload.status && StatusService.getStatuses().indexOf(payload.status) === -1) {
                return res.status(500).json({ message: 'Такого статуса не существует' })
            }

            let fieldsEdited = Object.keys(payload)

            let hystoryChanges = HystoryFields.map((field) => {
                const nameField = field

                if (fieldsEdited.indexOf(field) !== -1) {
                    return {
                        taskId: payload._id,
                        field: nameField,
                        author: authorAuth,
                        newValue: payload[field],
                    }
                }

            })

            const filteredHystoryChanges = hystoryChanges.filter((el) => el !== undefined);

            await Hystory.create(filteredHystoryChanges)

            const editTask = await TaskService.editeTask(payload)
            return res.json(editTask)
        }
        catch (e) {
            res.status(500).json(e.message)
        }
    }
    async getTasks(req, res) {
        try {
            const Tasks = await TaskService.getTasks(req.body)
            return res.json(Tasks)
        }
        catch (e) {
            res.status(500).json(e)
        }
    }
    async getTask(req, res) {
        try {
            if (mongoose.Types.ObjectId.isValid(req.params.id)) {
                const task = await TaskService.getTask(req.params.id)
                if (task.id) {
                    return res.json(task)
                } else {
                    return res.status(400).json(task)
                }
            } else {
                return res.status(400).json({ message: 'Неверный формат id' })
            }
        }
        catch (e) {
            res.status(500).json(e)
        }
    }
    async deleteTask(req, res) {
        try {
            if (mongoose.Types.ObjectId.isValid(req.params.id)) {
                const task = await TaskService.getTask(req.params.id)
                if (task.id) {
                    let isAdmin;
                    if (req.user.roles.indexOf('ADMIN') !== -1) {
                        isAdmin = true
                    } else {
                        isAdmin = false
                    }
                    const authorAuth = req.user.id
                    const taskBD = await Task.findById(task.id)

                    if (taskBD.author === authorAuth || isAdmin) {
                        await TaskService.deleteTask(task.id)
                        return res.status(200).json({ message: `Задача удалена` })
                    } else {
                        return res.status(500).json({ message: 'Можно удалять только свои задачи' })
                    }

                } else {
                    return res.status(400).json(task)
                }
            } else {
                return res.status(400).json({ message: 'Неверный формат id' })
            }
        }
        catch (e) {
            res.status(500).json({ message: `${e}` })
        }
    }
}

export default new TaskController()