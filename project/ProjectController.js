import ProjectService from './ProjectService.js';

class ProjectController {
   
    async createProject(req, res) {
        try {
            const project = await ProjectService.createProject(req.body)
            res.json(project)
        }
        catch (e) {
            res.status(500).json(e)
        }
    }
    async editeProject(req, res) {
        try {
            const editProject = await ProjectService.editeProject(req.body)
            return res.json(editProject)
        }
        catch (e) {
            res.status(500).json(e.message)
        }
    }
    async getProjects(req, res) {
        try {
            const { page, limit } = req.query

            const projects = await ProjectService.getProjects(page, limit)
            return res.json(projects)
        }
        catch (e) {
            res.status(500).json(e)
        }
    }
    async getProject(req, res) {
        try {
            const project = await ProjectService.getProject(req.params.name)
            return res.json(project)
        }
        catch (e) {
            res.status(500).json(e)
        }
    }
    async deleteProject(req, res) {
        try {
            const post = await ProjectService.deleteProject(req.params.id)
            return res.json(post)
        }
        catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new ProjectController()