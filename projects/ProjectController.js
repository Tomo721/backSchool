import ProjectService from './ProjectService.js';
import Project from './Project.js';
import mongoose from 'mongoose'

class ProjectController {
   
    async createProject(req, res) {
        try {
            req.body.author = req.user.id

            const project = await ProjectService.createProject(req.body)
            res.json(project)
        }
        catch (e) {
            res.status(500).json(e)
        }
    }
    async editeProject(req, res) {
        try {
            const authorAuth = req.user.id
            req.body.author = authorAuth
            req.body.authorEdited = authorAuth

            req.body.dateEdited = new Date().toISOString()

            const projectBD = await Project.findById(req.body._id)

            if (projectBD.author !== authorAuth) {
                return res.status(500).json({ message: 'Можно редактировать только свои проекты' })
            }

            const editProject = await ProjectService.editeProject(req.body)
            return res.json(editProject)
        }
        catch (e) {
            res.status(500).json(e.message)
        }
    }
    async getProjects(req, res) {
        try {
            const projects = await ProjectService.getProjects(req.body)
            return res.json(projects)
        }
        catch (e) {
            res.status(500).json(e)
        }
    }
    async getProject(req, res) {
        try {
            if (mongoose.Types.ObjectId.isValid(req.params.id)) {
                const project = await ProjectService.getProject(req.params.id)

                if (project.id) {
                    return res.json(project)
                } else {
                    return res.status(400).json(project)
                }
            } else {
                return res.status(400).json({ message: 'Неверный формат id' })
            }
        }
        catch (e) {
            res.status(500).json(e)
        }
    }
    async deleteProject(req, res) {
        try {
            if (mongoose.Types.ObjectId.isValid(req.params.id)) {
                const project = await ProjectService.getProject(req.params.id)
                if (project.id) {
                    let isAdmin;

                    if (req.user.roles.indexOf('ADMIN') !== -1) {
                        isAdmin = true
                    } else {
                        isAdmin = false
                    }

                    const authorAuth = req.user.id

                    if (project.author === authorAuth || isAdmin) {
                        await ProjectService.deleteProject(project.id)
                        return res.status(200).json({ message: `Проект удален` })
                    } else {
                        return res.status(500).json({ message: 'Можно удалять только свои проекты' })
                    }

                } else {
                    return res.status(400).json(project)
                }
            } else {
                return res.status(400).json({ message: 'Неверный формат id' })
            }
        }
        catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new ProjectController()