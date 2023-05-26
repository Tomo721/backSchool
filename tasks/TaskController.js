import TaskService from './TaskService.js';

class TaskController {
   
    async createTask(req, res) {
        try {
            const task = await TaskService.createTask(req.body)
            res.json(task)
        }
        catch (e) {
            res.status(500).json(e)
        }
    }
    async editeTask(req, res) {
        try {
            const editTask = await TaskService.editeTask(req.body)
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
            const task = await TaskService.getTask(req.params.id)
            return res.json(task)
        }
        catch (e) {
            res.status(500).json(e)
        }
    }
    async deleteTask(req, res) {
        try {
            const post = await TaskService.deleteTask(req.params.id)
            return res.json(post)
        }
        catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new TaskController()